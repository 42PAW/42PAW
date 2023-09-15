package proj.pet.utils.log;

import org.aspectj.lang.JoinPoint;

public interface LogAspect {
	void logging();

	void log(JoinPoint joinPoint);
}
