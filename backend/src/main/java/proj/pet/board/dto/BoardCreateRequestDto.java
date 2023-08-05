package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@Getter
public class BoardCreateRequestDto {
	List<BoardMediaDto> mediaDataList;
	List<Species> categoryList;
	String content;
}
