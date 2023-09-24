package proj.pet.board.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@Getter
@ToString
public class BoardCreateRequestDto {

	@NotNull
	private final List<MultipartFile> mediaDataList;
	@NotNull
	private final List<Species> categoryList;
	private final String content;
}
