package proj.pet.board.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.category.domain.Species;

@AllArgsConstructor
@Getter
@ToString
public class BoardCreateRequestDto {

	@NotNull
	private final List<MultipartFile> mediaDataList;
	private final List<Species> categoryList;
	private final String content;
}
