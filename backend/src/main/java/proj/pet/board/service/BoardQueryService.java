package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardsResponseDto;

public interface BoardQueryService {
	BoardsResponseDto getMainViewBoards(Long loginUserId, PageRequest pageRequest);

	BoardsResponseDto getHotBoards(Long loginUserId, PageRequest pageRequest);

	BoardsResponseDto getMemberBoards(Long loginUserId, Long memberId, PageRequest pageRequest);
}
