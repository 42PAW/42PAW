package proj.pet.board.dto;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.exception.ControllerException;
import proj.pet.exception.ExceptionStatus;

@Getter
public class BoardMediaDto {
	private final int index;
	private final MultipartFile mediaData;

	public BoardMediaDto(int index, MultipartFile mediaData) {
		String contentType = mediaData.getContentType();
		if (contentType == null || contentType.isEmpty()) {
			throw new ControllerException(ExceptionStatus.INVALID_ARGUMENT);
		}
		this.index = index;
		this.mediaData = mediaData;
	}
}
