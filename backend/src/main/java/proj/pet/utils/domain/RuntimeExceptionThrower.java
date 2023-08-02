package proj.pet.utils.domain;

import proj.pet.exception.DomainException;
import proj.pet.exception.ExceptionStatus;

public class RuntimeExceptionThrower {
	public static void ifTrue(boolean condition, RuntimeException exception) {
		if (condition) {
			throw exception;
		}
	}

	public static void ifFalse(boolean condition, RuntimeException exception) {
		if (!condition) {
			throw exception;
		}
	}

	public static void checkValidity(Validatable validatable) {
		if (!validatable.isValid())
			throw new DomainException(ExceptionStatus.INVALID_ARGUMENT);
	}
}
