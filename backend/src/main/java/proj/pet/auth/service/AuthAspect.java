package proj.pet.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.CookieManager;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.auth.domain.jwt.JwtProperties;
import proj.pet.auth.domain.jwt.JwtTokenManager;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.MemberRole;

import java.io.IOException;

import static proj.pet.exception.ExceptionStatus.UNAUTHENTICATED;
import static proj.pet.exception.ExceptionStatus.UNAUTHORIZED;
import static proj.pet.member.domain.MemberRole.NOT_REGISTERED;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthAspect {

	private final JwtTokenManager jwtTokenManager;
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
	public void AuthToken(AuthGuard authGuard) throws IOException {
		/**
		 * 현재 인터셉트 된 서블릿의 {@link HttpServletRequest}를 가져옵니다.
		 */
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getResponse();

		String token = jwtTokenManager.extractTokenFrom(request);
		if (!jwtTokenManager.isTokenValid(token, jwtProperties.createSigningKey())) {
			cookieManager.deleteCookie(response, jwtProperties.getTokenName());
			throw new ServiceException(UNAUTHORIZED);
		}
		JwtPayload jwtPayload = jwtTokenManager.createFtPayload(token);
		MemberRole role = jwtPayload.getRole();
		if (role.equals(NOT_REGISTERED)) {
			throw new ServiceException(UNAUTHENTICATED);
		}
		if (!authGuard.level().isMatchWith(role)) {
			cookieManager.deleteCookie(response, jwtProperties.getTokenName());
			throw new ServiceException(UNAUTHENTICATED);
		}
	}
}
