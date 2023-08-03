package proj.pet.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.service.BoardFacadeService;
import proj.pet.member.dto.UserSession;

@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardFacadeService boardFacadeService;

	@GetMapping
	public BoardsResponseDto getMainViewBoards(
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMainViewBoards(pageRequest);
	}

	@GetMapping("/hot")
	public BoardsResponseDto getHotBoards(
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getHotBoards(pageRequest);
	}

	@GetMapping("/members/{memberId}")
	public BoardsResponseDto getMemberBoards(
			@RequestParam("size") int size,
			@RequestParam("page") int page,
			@PathVariable("memberId") Long memberId) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMemberBoards(pageRequest, memberId);
	}

	@PostMapping
	public void createBoard(
			UserSession userSession,
			@RequestBody BoardCreateRequestDto boardCreateRequestDto) {
		boardFacadeService.createBoard(userSession, boardCreateRequestDto);
	}

	@DeleteMapping("/{boardId}")
	public void deleteBoard(
			UserSession userSession,
			@PathVariable("boardId") Long boardId) {
		boardFacadeService.deleteBoard(userSession, boardId);
	}
}
