package proj.pet.testutil.testdouble;

import proj.pet.utils.domain.IdDomain;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MockEntityStringifier {
	
	public static void printMock(IdDomain<?> testEntity) {
		StringBuilder sb = new StringBuilder();
		String className = testEntity.getClass().getSimpleName();
		sb.append(className).append(" : {\n");
		Method[] methods = testEntity.getClass().getMethods();

		for (Method method : methods) {
			if (isGetter(method)) {
				sb.append("  ");
				try {
					sb.append(method.getName().substring(3)).append(": ").append(method.invoke(testEntity)).append("\n");
				} catch (IllegalAccessException | InvocationTargetException e) {
					sb.append(method.getName().substring(3)).append(": ").append("Error retrieving value").append("\n");
				}
			}
		}
		sb.append("}\n");
		System.out.println(sb);
	}

	private static boolean isGetter(Method method) {
		return method.getName().startsWith("get") && !method.getReturnType().equals(void.class) && method.getParameterTypes().length == 0;
	}
}
