package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.dto.UserSession;

public interface BoardFacadeService {

	BoardsResponseDto getMainViewBoards(PageRequest pageRequest);

	BoardsResponseDto getHotBoards(PageRequest pageRequest);
	BoardsResponseDto getMemberBoards(PageRequest pageRequest, Long memberId);

	void createBoard(UserSession userSession, BoardCreateRequestDto boardCreateRequestDto);

	void deleteBoard(UserSession userSession, Long boardId);
}
