package proj.pet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ExceptionStatusDto {
	private final int statusCode;
	private final String message;
	private final String error;
}
