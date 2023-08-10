package proj.pet.member.domain;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.auth.domain.jwt.JwtTokenManager;
import proj.pet.exception.ControllerException;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.member.repository.MemberRepository;

import static proj.pet.exception.ExceptionStatus.INCORRECT_ARGUMENT;

@Component
@Aspect
@RequiredArgsConstructor
public class UserAspect {

	private final JwtTokenManager tokenManager;
	private final MemberRepository memberRepository;

	@Around("execution(* *(.., @UserSession (*), ..))")
	public Object setUserSessionDto(ProceedingJoinPoint joinPoint) throws Throwable {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		//@User를 쓰려면 반드시 첫 매개변수에 UserSessionDto로 설정해주어야 함.
		Object[] args = joinPoint.getArgs();
		if (!args[0].getClass().equals(UserSessionDto.class)) {
			throw new ControllerException(INCORRECT_ARGUMENT);
		}
		args[0] = getUserSessionDtoByRequest(request);
		return joinPoint.proceed(args);
	}

	// ToDo: 수정 필요
	public UserSessionDto getUserSessionDtoByRequest(HttpServletRequest req) {
		String token = tokenManager.extractTokenFrom(req);
		JwtPayload ftPayload = tokenManager.createFtPayload(token);
		Member member = memberRepository.findByOauthName(ftPayload.getOauthName());
		return new UserSessionDto(member.getId(), member.getNickname(), member.getMemberRole());
	}
}
