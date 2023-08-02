package proj.pet.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.service.BoardFacadeService;

@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardFacadeService boardFacadeService;

	@GetMapping
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

	@PostMapping
	public void createBoard(@RequestBody BoardCreateRequestDto boardCreateRequestDto) {
		boardFacadeService.createBoard(boardCreateRequestDto);
	}

	@DeleteMapping("/{boardId}")
	public void deleteBoard(@PathVariable("boardId") Long boardId) {
		boardFacadeService.deleteBoard(boardId);
	}
}
