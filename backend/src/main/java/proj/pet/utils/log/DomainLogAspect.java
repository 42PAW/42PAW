package proj.pet.utils.log;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class DomainLogAspect extends LogAspectAbstract implements LogAspect {

	@Pointcut("execution(* proj.pet..*Domain*.*(..))")
	@Override
	public void logging() {

	}

	@Before("logging()")
	@Override
	public void log(JoinPoint joinPoint) {
		String result = this.getLog(joinPoint);
		log.debug(result);
	}
}
