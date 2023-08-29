package proj.pet.board.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@Getter
public class BoardCreateRequestDto {
	@NotNull
	private final List<MultipartFile> mediaDataList;
	private final List<Species> categoryList;
	private final String content;
}
