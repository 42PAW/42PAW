package proj.pet.board.service;

import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardMediaDto;
import proj.pet.category.domain.Species;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardService {
	Board createBoard(Long memberId, List<Species> categoryList, List<BoardMediaDto> mediaDataList, String content, LocalDateTime now);

	void deleteBoard(Long memberId, Long boardId);
}
