package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class BoardMediaDto {
	private final int index;
	private final MultipartFile mediaData;
}
