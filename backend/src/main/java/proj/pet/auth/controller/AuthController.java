package proj.pet.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.DomainProperties;
import proj.pet.auth.domain.FtOauthProperties;
import proj.pet.auth.service.AuthFacadeService;
import proj.pet.exception.ControllerException;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

import java.io.IOException;
import java.time.LocalDateTime;

import static proj.pet.auth.domain.AuthLevel.ADMIN_ONLY;
import static proj.pet.exception.ExceptionStatus.INTERNAL_SERVER_ERROR;

/**
 * 인증을 처리하는 컨트롤러
 * <p>
 * OAuth 2.0 방식을 사용합니다.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/auth")
public class AuthController {

	private final AuthFacadeService authFacadeService;
	private final FtOauthProperties ftOauthProperties;
	private final DomainProperties domainProperties;

	@GetMapping
	@AuthGuard(level = ADMIN_ONLY)
	public void test(@UserSession UserSessionDto userSessionDto) {
		System.out.println("userSessionDto = " + userSessionDto);
	}

	@GetMapping("/login")
	public void login(
			HttpServletResponse response
	) {
		authFacadeService.requestLoginToApi(response, ftOauthProperties);
	}

	@GetMapping("/login/callback")
	public void loginCallback(
			@RequestParam String code,
			HttpServletResponse response,
			HttpServletRequest request) {
		authFacadeService.handleLogin(code, request, response, ftOauthProperties, LocalDateTime.now());
		try {
			response.sendRedirect(domainProperties.getFrontendHost());
		} catch (IOException e) {
			e.printStackTrace();
			throw new ControllerException(INTERNAL_SERVER_ERROR);
		}
	}

}
