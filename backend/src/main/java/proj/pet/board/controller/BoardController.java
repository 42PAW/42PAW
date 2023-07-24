package proj.pet.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.board.dto.BoardCommentsResponseDto;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.service.BoardFacadeService;

@RestController("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardFacadeService boardFacadeService;

	@GetMapping("/")
	public BoardsResponseDto getMainViewBoards() {
		return boardFacadeService.getMainViewBoards();
	}

	@GetMapping("/hot")
	public BoardsResponseDto getHotBoards() {
		return boardFacadeService.getHotBoards();
	}

	@GetMapping("/followings")
	public BoardsResponseDto getFollowingsBoards() {
		return boardFacadeService.getFollowingsBoards();
	}

	@GetMapping("/{boardId}/comments")
	public BoardCommentsResponseDto getBoardComments(@PathVariable("boardId") Long boardId) {
		return boardFacadeService.getBoardComments(boardId);
	}

	@PostMapping("/")
	public void createBoard(@RequestBody BoardCreateRequestDto boardCreateRequestDto) {
		boardFacadeService.createBoard(boardCreateRequestDto);
	}

	@DeleteMapping("/{boardId}")
	public void deleteBoard(@PathVariable("boardId") Long boardId) {
		boardFacadeService.deleteBoard(boardId);
	}
}
