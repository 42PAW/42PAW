package proj.pet.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import proj.pet.auth.domain.OauthProperties;

import java.time.LocalDateTime;

public interface AuthFacadeService {
	void requestLoginToApi(HttpServletResponse res, OauthProperties oauthProperties);

	void handleLogin(String code, HttpServletRequest req, HttpServletResponse res,
	                 OauthProperties oauthProperties, LocalDateTime now);

	void logout(HttpServletResponse res, OauthProperties oauthProperties);
}