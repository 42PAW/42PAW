package proj.pet.board.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@Getter
public class BoardCreateRequestDto2 {
	@NotNull
	private final List<String> mediaUrlList;
	@NotNull
	private final List<Species> categoryList;
	private final String content;
}
