package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardsResponseDto;

public interface BoardQueryService {
	BoardsResponseDto getMainViewBoards(PageRequest pageRequest);

	BoardsResponseDto getHotBoards(PageRequest pageRequest);

	BoardsResponseDto getMemberBoards(PageRequest pageRequest, Long memberId);
}
