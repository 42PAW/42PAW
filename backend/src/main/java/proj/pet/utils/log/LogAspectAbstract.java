package proj.pet.utils.log;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.DefaultParameterNameDiscoverer;
import org.springframework.core.ParameterNameDiscoverer;

import java.lang.reflect.Method;
import java.util.Objects;

public abstract class LogAspectAbstract {
	private final ParameterNameDiscoverer discoverer = new DefaultParameterNameDiscoverer();
	
	protected String getLog(JoinPoint joinPoint) {
		Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
		String className = joinPoint.getTarget().getClass().getName();
		String methodName = method.getName();
		Object[] args = joinPoint.getArgs();
		String[] parameterNames = discoverer.getParameterNames(method);

		StringBuilder sb = new StringBuilder();
		sb.append(className).append("#");
		sb.append(methodName).append("#");
		if (Objects.nonNull(parameterNames)) {
			for (int i = 0; i < args.length; i++) {
				sb.append("{").append(parameterNames[i]).append("=");
				sb.append(args[i].toString()).append("}&");
			}
		}
		if (args.length > 0) {
			sb.setLength(sb.length() - 1);
		}
		return sb.toString();
	}
}
