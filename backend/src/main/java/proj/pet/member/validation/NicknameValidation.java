package proj.pet.member.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {})
@Size(min = 1, max = 10, message = "닉네임은 10자 이하로 작성해 주세요.")
@Pattern(regexp = "^[a-zA-Z\\u00C0-\\u00FF\\u0100-\\u017F\\u0180-\\u024F\\u0370-\\u03FF\\u0400-\\u04FF\\u3040-\\u30FF\\u3130-\\u318F\\uAC00-\\uD7AF\\.\\_\\-][a-zA-Z0-9\\u00C0-\\u00FF\\u0100-\\u017F\\u0180-\\u024F\\u0370-\\u03FF\\u0400-\\u04FF\\u3040-\\u30FF\\u3130-\\u318F\\uAC00-\\uD7AF\\.\\_\\-]*$", message = "닉네임에는 영어 소문자, '.' , '_'만 들어갈 수 있습니다.")
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface NicknameValidation {
	String message() default "닉네임이 올바르지 않습니다.";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
