package proj.pet.auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.auth.domain.OauthProperties;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthFacadeServiceImpl implements AuthFacadeService {
	private final OauthService oauthService;
	private final AuthService authService;

	@Override public void requestLoginToApi(HttpServletResponse res, OauthProperties oauthProperties) {
		oauthService.sendCodeRequestToOauth(res, oauthProperties);
	}

	@Override public void handleLogin(String code, HttpServletRequest req, HttpServletResponse res, OauthProperties oauthProperties, LocalDateTime now) {
		String accessToken = oauthService.getAccessTokenByCode(code, oauthProperties);
		System.out.println("accessToken = " + accessToken);
		JsonNode profileJson = oauthService.getProfileJsonByToken(accessToken, oauthProperties);
		System.out.println("profileJson = " + profileJson);
		Map<String, Object> claims = oauthService.makeClaimsByProviderProfile(profileJson);
		System.out.println("claims = " + claims);
		authService.addUserIfNotExist();
		oauthService.provideServerTokenToClient(profileJson, req, res, now);
	}

	@Override public void logout(HttpServletResponse res, OauthProperties oauthProperties) {

	}
}
