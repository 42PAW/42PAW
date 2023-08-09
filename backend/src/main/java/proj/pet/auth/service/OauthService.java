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

@Service
@RequiredArgsConstructor
public class OauthService {

	private final ObjectMapper objectMapper;
	private final JwtTokenProvider tokenProvider;
	private final JwtProperties jwtProperties;
	private final CookieManager cookieManager;

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

	public Map<String, Object> makeClaimsByProviderProfile(JsonNode profile) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("email", profile.get("email").asText());
		claims.put("oauthName", profile.get("login").asText());
		claims.put("campus", Country.Campus.from(profile.get("campus").get(0).get("name").asText()).getName());
		claims.put("role", USER);
		return claims;
	}

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

	public void provideServerTokenToClient(Map<String, Object> claims, HttpServletRequest req, HttpServletResponse res, LocalDateTime now) {
		String serverToken = tokenProvider.createToken(claims, jwtProperties.getSigningKey(), jwtProperties.getExpiry(), now);
		Cookie cookie = cookieManager.cookieOf(jwtProperties.getTokenName(), serverToken);
		cookieManager.setCookieToClient(res, cookie, "/", req.getServerName(), (int) jwtProperties.getExpiry());
	}
}
