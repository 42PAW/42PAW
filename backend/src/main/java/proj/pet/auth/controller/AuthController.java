package proj.pet.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;

import static proj.pet.auth.domain.AuthLevel.USER_ONLY;

/**
 * 인증을 처리하는 컨트롤러
 * <p>
 * OAuth 2.0 방식을 사용합니다.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/auth")
public class AuthController {

	@GetMapping
	@AuthGuard(level = USER_ONLY)
	public void test() {
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@AUTHENTICATED@@@@@@@@@@@@@@@@@@@@@");
	}

}
