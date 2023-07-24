package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.dto.BoardCommentsResponseDto;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;

@Service
@RequiredArgsConstructor
public class BoardFacadeServiceImpl implements BoardFacadeService {

	@Override
	public BoardsResponseDto getMainViewBoards() {
		return null;
	}

	@Override
	public BoardsResponseDto getHotBoards() {
		return null;
	}

	@Override
	public BoardsResponseDto getFollowingsBoards() {
		return null;
	}

	@Override
	public BoardCommentsResponseDto getBoardComments(Long boardId) {
		return null;
	}

	@Override
	public void createBoard(BoardCreateRequestDto boardCreateRequestDto) {
	}

	@Override
	public void deleteBoard(Long boardId) {
	}
}
