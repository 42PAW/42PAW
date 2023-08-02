package proj.pet.exception;

import lombok.Getter;
import proj.pet.dto.ExceptionStatusDto;

@Getter
public class DomainException extends RuntimeException{
	private final ExceptionStatusDto status;


	public DomainException(ExceptionStatus status) {
		this.status = new ExceptionStatusDto(status.getStatusCode(), status.getMessage(), status.getError());
	}

	public DomainException(ExceptionStatus status, String message) {
		this.status = new ExceptionStatusDto(status.getStatusCode(), message, status.getError());
	}
}
