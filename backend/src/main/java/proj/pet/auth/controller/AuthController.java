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
	private final DomainProperties domainProperties;

	@GetMapping
	@AuthGuard(level = ADMIN_ONLY)
	public void test(@UserSession UserSessionDto userSessionDto) {
		System.out.println("userSessionDto = " + userSessionDto);
	}

	/**
	 * 로그인 요청을 합니다. - Oauth 로그인으로 redirect
	 *
	 * @param response
	 */
	@GetMapping("/login")
	public void ftLogin(
			HttpServletResponse response
	) {
		authFacadeService.requestLoginToApi(response);
	}

	/**
	 * 로그인 콜백을 합니다. - Oauth 로그인 성공 시 이 route로 redirect
	 * <p>
	 * code를 받아서 access token을 받아옵니다.
	 * <br>
	 * access token으로 사용자 정보를 받아옵니다.
	 * <br>
	 * 사용자 정보로 서버 측 토큰을 발급합니다.
	 * <br>
	 * 첫 로그인 시 회원가입 페이지로 리디렉션합니다. TODO
	 *
	 * @param code
	 * @param response
	 * @param request
	 */
	@GetMapping("/login/callback")
	public void loginCallback(
			@RequestParam String code,
			HttpServletResponse response,
			HttpServletRequest request) {
		authFacadeService.handleFortyTwoLogin(code, request, response, LocalDateTime.now());
		try {
			response.sendRedirect(domainProperties.getFrontendDomain());
		} catch (IOException e) {
			e.printStackTrace();
			throw new ControllerException(INTERNAL_SERVER_ERROR);
		}
	}

}
