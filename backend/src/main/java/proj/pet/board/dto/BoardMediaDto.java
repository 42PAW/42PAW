package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Getter
public class BoardMediaDto {
	private int index;
	private MultipartFile mediaData;
}
