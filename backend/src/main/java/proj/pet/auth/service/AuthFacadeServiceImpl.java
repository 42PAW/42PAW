package proj.pet.auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.auth.domain.FtOauthProperties;
import proj.pet.auth.domain.OauthProperties;
import proj.pet.auth.domain.jwt.JwtProperties;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * 인증 관련 서비스를 수행하는 파사드
 */
@Service
@RequiredArgsConstructor
public class AuthFacadeServiceImpl implements AuthFacadeService {
	private final OauthService oauthService;
	private final FtOauthProperties ftOauthProperties;
	private final JwtProperties jwtProperties;

	@Override public void requestLoginToApi(HttpServletResponse res) {
		oauthService.sendCodeRequestToOauth(res, ftOauthProperties);
	}

	@Override public void handleFortyTwoLogin(String code, HttpServletRequest req, HttpServletResponse res, LocalDateTime now) {
		String accessToken = oauthService.getAccessTokenByCode(code, ftOauthProperties);
		JsonNode profileJson = oauthService.getProfileJsonByToken(accessToken, ftOauthProperties);
		Map<String, Object> claims = oauthService.makeClaimsByProviderProfile(profileJson);
		oauthService.provideServerTokenToClient(claims, req, res, now, jwtProperties);
	}

	@Override public void logout(HttpServletResponse res, OauthProperties oauthProperties) {

	}
}
