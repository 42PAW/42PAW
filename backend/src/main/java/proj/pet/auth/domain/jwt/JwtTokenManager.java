package proj.pet.auth.domain.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import proj.pet.exception.DomainException;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.MemberRole;
import proj.pet.member.domain.OauthProfile;

import java.security.Key;
import java.util.Base64;
import java.util.Map;

import static proj.pet.exception.ExceptionStatus.INTERNAL_SERVER_ERROR;
import static proj.pet.exception.ExceptionStatus.UNAUTHORIZED;
import static proj.pet.member.domain.OauthType.FORTY_TWO;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtTokenManager {

	private static final String JWT_DELIMITER = "\\.";
	private static final int PAYLOAD_INDEX = 1;
	private static final String AUTH_HEADER = "Authorization";
	private static final String AUTH_TYPE = "Bearer";
	private final ObjectMapper objectMapper;

	/**
	 * JWT 토큰의 유효성을 검사합니다.
	 *
	 * @param token 토큰
	 * @param key   signature 키
	 * @return 유효한 토큰인지 여부
	 */
	public boolean isTokenValid(String token, Key key) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build()
					.parseClaimsJws(token);
			return true;
		} catch (MalformedJwtException e) {
			log.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			log.info("만료된 JWT 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			log.info("지원되지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {
			log.info("JWT 토큰이 잘못되었습니다.");
		} catch (Exception e) {
			log.error("JWT 토큰 검사 중 알 수 없는 오류가 발생했습니다.");
		}
		return false;
	}

	/**
	 * 토큰의 Payload를 가져옵니다.
	 *
	 * @param token
	 * @return
	 */
	public JwtPayload createFtPayload(String token) {
		JsonNode payloadJson = extractPayloadJson(token);
		return JwtPayload.builder()
				.email(payloadJson.get("email").asText())
				.profile(
						OauthProfile.of(
								FORTY_TWO,
								payloadJson.get("oauthId").asText(),
								payloadJson.get("oauthName").asText()))
				.campus(Country.Campus.from(payloadJson.get("campus").asText()))
				.role(MemberRole.from(payloadJson.get("role").asText()))
				.build();
	}

	public Map<String, Object> extractClaims(String token) {
		JsonNode payloadJson = extractPayloadJson(token);
		return Map.of(
				"oauthId", payloadJson.get("oauthId").asText(),
				"oauthType", payloadJson.get("oauthType").asText(),
				"oauthName", payloadJson.get("oauthName").asText(),
				"email", payloadJson.get("email").asText(),
				"campus", Country.Campus.from(payloadJson.get("campus").asText()),
				"role", MemberRole.from(payloadJson.get("role").asText())
		);
	}

	/**
	 * 토큰의 Payload를 JsonNode(JSON) 형식으로 가져옵니다.
	 * <br>
	 * 원하는 양식(구현)에 맞추어 사용합니다.
	 */
	private JsonNode extractPayloadJson(String token) {
		final String payload = token.split(JWT_DELIMITER)[PAYLOAD_INDEX];
		Base64.Decoder decoder = Base64.getUrlDecoder();
		try {
			return objectMapper.readTree(new String(decoder.decode(payload)));
		} catch (JsonProcessingException e) {
			log.error("토큰의 Payload를 JsonNode(JSON) 형식으로 가져오는데 실패했습니다.");
			throw new DomainException(INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 토큰을 추출합니다.
	 *
	 * @param req 추출할 {@link HttpServletRequest}
	 * @return 추출된 토큰 - AUTH_TYPE 이후 공백이 있기에 1을 더해서 substring 합니다.
	 * @throws DomainException 토큰이 없거나, AUTH_TYPE이 유효하지 않을 경우.
	 */
	public String extractTokenFrom(HttpServletRequest req) {
		String authHeader = req.getHeader(AUTH_HEADER);
		if (authHeader == null || !authHeader.startsWith(AUTH_TYPE)) {
			throw new DomainException(UNAUTHORIZED);
		}
		return authHeader.substring(AUTH_TYPE.length() + 1);
	}
}
