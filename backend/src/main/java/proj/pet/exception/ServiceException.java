package proj.pet.exception;

import lombok.Getter;
import proj.pet.dto.ExceptionStatusDto;

@Getter
public class ServiceException extends RuntimeException{
	private final ExceptionStatusDto status;


	public ServiceException(ExceptionStatus status) {
		this.status = new ExceptionStatusDto(status.getStatusCode(), status.getMessage(), status.getError());
	}

	public ServiceException(ExceptionStatus status, String message) {
		this.status = new ExceptionStatusDto(status.getStatusCode(), message, status.getError());
	}
}
