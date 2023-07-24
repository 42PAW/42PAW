package proj.pet.board.service;

import proj.pet.board.dto.BoardCommentsResponseDto;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;

public interface BoardFacadeService {

	BoardsResponseDto getMainViewBoards();

	BoardsResponseDto getHotBoards();

	BoardsResponseDto getFollowingsBoards();

	BoardCommentsResponseDto getBoardComments(Long boardId);

	void createBoard(BoardCreateRequestDto boardCreateRequestDto);

	void deleteBoard(Long boardId);
}
