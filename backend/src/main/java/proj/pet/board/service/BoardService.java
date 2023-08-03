package proj.pet.board.service;

import proj.pet.board.dto.BoardMediaDto;
import proj.pet.category.domain.AnimalCategory;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardService {
	void createBoard(Long memberId, List<AnimalCategory> categoryList, List<BoardMediaDto> mediaDataList, String content, LocalDateTime now);

	void deleteBoard(Long memberId, Long boardId);
}
