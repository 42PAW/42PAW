package proj.pet.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

	@ExceptionHandler(ControllerException.class)
	public ResponseEntity<?> controllerExceptionHandler(ControllerException e) {
		e.printStackTrace();
		return ResponseEntity
				.status(e.getStatus().getStatusCode())
				.body(e.getStatus());
	}
	@ExceptionHandler(ServiceException.class)
	public ResponseEntity<?> serviceExceptionHandler(ServiceException e) {
		e.printStackTrace();
		return ResponseEntity
				.status(e.getStatus().getStatusCode())
				.body(e.getStatus());
	}
	@ExceptionHandler(DomainException.class)
	public ResponseEntity<?> domainExceptionHandler(DomainException e) {
		e.printStackTrace();
		return ResponseEntity
				.status(e.getStatus().getStatusCode())
				.body(e.getStatus());
	}


}
