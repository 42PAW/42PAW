package proj.pet.member.domain;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 컨트롤러에서 UserSessionDto를 받는 메소드에 대해 UserSessionDto를 set하기 위한 커스텀 어노테이션.
 * <p>
 * 반드시 첫번째 매개변수로 UserSessionDto를 설정하여 사용하여야 한다.
 *
 * @see proj.pet.member.domain.UserAspect
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface UserSession {
}
