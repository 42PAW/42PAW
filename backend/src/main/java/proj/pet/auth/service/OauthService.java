package proj.pet.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import proj.pet.auth.domain.ApiRequestManager;
import proj.pet.auth.domain.CookieManager;
import proj.pet.auth.domain.OauthProperties;
import proj.pet.auth.domain.jwt.JwtProperties;
import proj.pet.auth.domain.jwt.JwtTokenProvider;
import proj.pet.exception.ExceptionStatus;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.Country;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static proj.pet.exception.ExceptionStatus.INTERNAL_SERVER_ERROR;
import static proj.pet.exception.ExceptionStatus.OAUTH_BAD_GATEWAY;
import static proj.pet.member.domain.MemberRole.USER;

/**
 * OAuth 관련 작업을 처리하는 서비스 클래스.
 */
@Service
@RequiredArgsConstructor
public class OauthService {

	private final ObjectMapper objectMapper;
	private final JwtTokenProvider tokenProvider;
	private final JwtProperties jwtProperties;
	private final CookieManager cookieManager;

	/**
	 * OAuth 인증을 위한 요청(authorization code 요청)을 보냅니다.
	 *
	 * @param response        HttpServletResponse
	 * @param oauthProperties OAuth 인증을 위한 정보를 담은 객체
	 */
	public void sendCodeRequestToOauth(HttpServletResponse response, OauthProperties oauthProperties) {
		try {
			response.sendRedirect(
					ApiRequestManager.of(oauthProperties)
							.createCodeRequestUri());
		} catch (IOException e) {
			e.printStackTrace();
			throw new ServiceException(INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * OAuth 인증을 위한 요청(access token 요청)을 보냅니다.
	 *
	 * @param code            authorization code
	 * @param oauthProperties OAuth 인증을 위한 정보를 담은 객체
	 * @return 해당 로그인 성공한 유저의 resource에 접근할 수 있는 access token
	 */
	public String getAccessTokenByCode(String code, OauthProperties oauthProperties) {
		return WebClient.create().post()
				.uri(oauthProperties.getAccessTokenRequestUri())
				.body(BodyInserters.fromFormData(
						ApiRequestManager.of(oauthProperties)
								.getAccessTokenRequestBodyMap(code)))
				.retrieve()
				.bodyToMono(String.class)
				.map(response -> {
					try {
						return objectMapper.readTree(response)
								.get(oauthProperties.getAccessTokenName()).asText();
					} catch (JsonProcessingException e) {
						throw new ServiceException(OAUTH_BAD_GATEWAY);
					}
				})
				.onErrorResume(e -> {
					throw new ServiceException(OAUTH_BAD_GATEWAY);
				})
				.block();
	}

	/**
	 * OAuth 인증을 통해 얻은 profile을 이용해 해당 유저의 정보를 Map 형태의 claims로 반환합니다.
	 *
	 * @param profile 로그인한 유저의 정보
	 * @return 해당 유저의 정보를 담은 Claim
	 */
	public Map<String, Object> makeClaimsByProviderProfile(JsonNode profile) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("email", profile.get("email").asText());
		claims.put("oauthName", profile.get("login").asText());
		claims.put("campus", Country.Campus.from(profile.get("campus").get(0).get("name").asText()).getName());
		claims.put("role", USER);
		return claims;
	}

	/**
	 * OAuth 인증을 통해 얻은 access token을 이용해 해당 유저의 정보를 JsonNode로 얻습니다.
	 *
	 * @param accessToken     resource 서버에 접근할 수 있는 access token
	 * @param oauthProperties OAuth 인증을 위한 정보를 담은 객체
	 * @return 해당 유저의 정보를 담은 JsonNode
	 */
	public JsonNode getProfileJsonByToken(String accessToken, OauthProperties oauthProperties) {
		return WebClient.create().get()
				.uri(oauthProperties.getUserInfoRequestUri())
				.headers(headers -> headers.setBearerAuth(accessToken))
				.retrieve()
				.bodyToMono(String.class)
				.map(response -> {
					try {
						return objectMapper.readTree(response);
					} catch (JsonProcessingException e) {
						throw new RuntimeException(e);
					}
				})
				.onErrorResume(e -> {
					throw new ServiceException(ExceptionStatus.OAUTH_BAD_GATEWAY);
				})
				.block();
	}

	/**
	 * 서버에서 클라이언트로 JWT 인증 토큰을 전달합니다.
	 *
	 * @param claims JWT 토큰 페이로드에 담길 정보
	 * @param req    클라이언트의 요청 서블릿
	 * @param res    클라이언트의 응답 서블릿
	 * @param now    현재 시간
	 */
	public void provideServerTokenToClient(Map<String, Object> claims, HttpServletRequest req, HttpServletResponse res, LocalDateTime now) {
		String serverToken = tokenProvider.createToken(claims, jwtProperties.getSigningKey(), jwtProperties.getExpiry(), now);
		Cookie cookie = cookieManager.cookieOf(jwtProperties.getTokenName(), serverToken);
		cookieManager.setCookieToClient(res, cookie, "/", req.getServerName(), (int) jwtProperties.getExpiry());
	}
}
