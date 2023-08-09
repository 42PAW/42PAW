package proj.pet.auth.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import proj.pet.exception.DomainException;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.Language;
import proj.pet.member.domain.MemberRole;

import java.security.Key;
import java.util.Base64;

import static proj.pet.exception.ExceptionStatus.INTERNAL_SERVER_ERROR;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtTokenManager {

	private static final String JWT_DELIMITER = "\\.";
	private static final int PAYLOAD_INDEX = 1;
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
	public FtPayload createFtPayload(String token) {
		JsonNode payloadJson = extractPayloadJson(token);
		return FtPayload.builder()
				.id(payloadJson.get("id").asLong())
				.email(payloadJson.get("email").asText())
				.nickname(payloadJson.get("name").asText())
				.country(Country.from(payloadJson.get("country").asText()))
				.language(Language.from(payloadJson.get("language").asText()))
				.role(MemberRole.from(payloadJson.get("role").asText()))
				.build();
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
}
