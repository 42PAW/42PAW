package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.category.domain.AnimalCategory;

import java.util.List;

@AllArgsConstructor
@Getter
public class BoardCreateRequestDto {
	List<BoardMediaDto> mediaDataList;
	List<AnimalCategory> categoryList;
	String content;
}
