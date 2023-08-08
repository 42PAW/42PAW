package proj.pet.auth.domain;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthAspectProcessor {

	private final TokenValidator tokenValidator;
	private final CookieManager cookieManager;
	private final JwtProperties jwtProperties;

	/**
	 * {@link AuthGuard} 어노테이션이 붙은 곳을 {@link org.aspectj.lang.annotation.Pointcut}으로 인터셉트합니다.
	 * <p>
	 * 해당 포인트 컷이 실행되기 전({@link Before}에 아래 메서드를 실행합니다.
	 *
	 * @param authGuard 인터셉트 된 해당 {@link AuthGuard} - Level을 알아낼 수 있습니다.
	 */
	@Before("@annotation(authGuard))")
	public void AuthToken(AuthGuard authGuard) {
		/**
		 * 현재 인터셉트 된 서블릿의 {@link HttpServletRequest}를 가져옵니다.
		 */
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getResponse();

		// token <- 추출 및 검증

		// token의 payload를 이용한 권한 검증

	}
}
