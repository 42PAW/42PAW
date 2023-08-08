package proj.pet.auth.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import proj.pet.exception.DomainException;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;
import static proj.pet.exception.ExceptionStatus.UNAUTHORIZED;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthAspectProcessor {

	private static final String AUTH_HEADER = "Authorization";
	private static final String AUTH_TYPE = "Bearer";

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
	public void AuthToken(AuthGuard authGuard) throws JsonProcessingException {
		/**
		 * 현재 인터셉트 된 서블릿의 {@link HttpServletRequest}를 가져옵니다.
		 */
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getResponse();

		String token = extractTokenFrom(request);
		if (!jwtTokenManager.isTokenValid(token, jwtProperties.getSigningKey())) {
			throw new DomainException(UNAUTHORIZED);
		}


	}

	/**
	 * 토큰을 추출합니다.
	 *
	 * @param req 추출할 {@link HttpServletRequest}
	 * @return 추출된 토큰 - AUTH_TYPE 이후 공백이 있기에 1을 더해서 substring 합니다.
	 */
	private String extractTokenFrom(HttpServletRequest req) {
		String authHeader = req.getHeader(AUTH_HEADER);
		if (authHeader == null || !authHeader.startsWith(AUTH_TYPE)) {
			throw new DomainException(INVALID_ARGUMENT);
		}
		return authHeader.substring(AUTH_TYPE.length() + 1);
	}
}
