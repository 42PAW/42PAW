package proj.pet.board.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BoardCreateRequestDto2 {
	@NotNull
	private List<String> mediaUrlList;
	@NotNull
	private List<Species> categoryList;
	private String content;
}
