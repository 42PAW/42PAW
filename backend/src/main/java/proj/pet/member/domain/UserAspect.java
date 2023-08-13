package proj.pet.member.domain;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.auth.domain.jwt.JwtTokenManager;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.member.repository.MemberRepository;

import java.lang.reflect.Parameter;
import java.util.Optional;

/**
 * 컨트롤러에서 UserSessionDto를 받는 메소드에 대해 UserSessionDto를 AOP로 set하기 위한 Aspect 클래스
 */
@Component
@Aspect
@RequiredArgsConstructor
public class UserAspect {

	private static final String EMPTY_NICKNAME = "";
	private static final long NOT_REGISTERED_ID = 0L;
	private final JwtTokenManager tokenManager;
	private final MemberRepository memberRepository;

	/**
	 * {@link UserSession} 어노테이션을 인터셉트하여 {@link UserSessionDto}를 주입한다.
	 *
	 * @param joinPoint {@link UserSession} 어노테이션이 붙은 메소드의 {@link ProceedingJoinPoint}
	 * @return UserSessionDto를 주입한 {@link ProceedingJoinPoint}의 매개변수
	 * @throws Throwable 아래 작업 중에 발생하는 예외
	 */
	@Around("execution(* *(.., @UserSession (*), ..))")
	public Object setUserSessionDto(ProceedingJoinPoint joinPoint) throws Throwable {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();

		Parameter[] parameters = ((MethodSignature) joinPoint.getSignature())
				.getMethod()
				.getParameters();
		Object[] args = joinPoint.getArgs();

		for (int i = 0; i < parameters.length; i++) {
			Parameter parameter = parameters[i];
			if (parameter.getAnnotation(UserSession.class) != null && parameter.getType().equals(UserSessionDto.class)) {
				args[i] = getUserSessionDtoByRequest(request);
			}
		}
		return joinPoint.proceed(args);
	}

	/**
	 * request 헤더에 토큰의 유무, 해당 토큰의 페이로드 속 프로필 이름을 통해 회원 정보를 조회하고, 이를 기준으로 UserSessionDto를 생성한다.
	 *
	 * @param req 인터셉트된 요청 헤더
	 * @return {@link UserSessionDto}
	 */
	public UserSessionDto getUserSessionDtoByRequest(HttpServletRequest req) {
		Optional<String> optionalToken = tokenManager.extractOptionalToken(req);
		if (optionalToken.isEmpty()) {
			return new UserSessionDto(NOT_REGISTERED_ID, EMPTY_NICKNAME, MemberRole.NOT_REGISTERED);
		}

		JwtPayload ftPayload = tokenManager.createFtPayload(optionalToken.get());
		Optional<Member> member = memberRepository.findByOauthName(ftPayload.getProfile().getName());
		if (member.isPresent()) {
			Member presentMember = member.get();
			return new UserSessionDto(presentMember.getId(), presentMember.getNickname(), presentMember.getMemberRole());
		} else {
			return new UserSessionDto(NOT_REGISTERED_ID, EMPTY_NICKNAME, MemberRole.NOT_REGISTERED);
		}
	}
}
