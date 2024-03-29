package proj.pet.board.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.service.BoardFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

import static proj.pet.auth.domain.AuthLevel.ANYONE;

@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
@Slf4j
public class BoardController {

	private final BoardFacadeService boardFacadeService;

	@GetMapping("/{boardId}")
	@AuthGuard(level = ANYONE)
	public BoardInfoDto getBoard(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("boardId") Long boardId) {
		return boardFacadeService.getBoard(userSessionDto, boardId);
	}

	@GetMapping
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getMainViewBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMainViewBoards(userSessionDto, pageRequest);
	}

	@GetMapping("/hot")
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getHotBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getHotBoards(userSessionDto, pageRequest);
	}

	@GetMapping("/members/{memberId}")
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getMemberBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page,
			@PathVariable("memberId") Long memberId) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMemberBoards(userSessionDto, memberId, pageRequest);
	}

	@GetMapping("/followings")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public BoardsPaginationDto getFollowingsBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getFollowingsBoards(userSessionDto, pageRequest);
	}

	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createBoard(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody @Valid BoardCreateRequestDto boardCreateRequestDto) {
		boardFacadeService.createBoard(userSessionDto,
				boardCreateRequestDto.getMediaUrlList(),
				boardCreateRequestDto.getCategoryList(),
				boardCreateRequestDto.getContent());
	}

	@DeleteMapping("/{boardId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteBoard(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("boardId") Long boardId) {
		boardFacadeService.deleteBoard(userSessionDto, boardId);
	}
}
