package proj.pet.board.controller;

import static proj.pet.auth.domain.AuthLevel.ANYONE;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.service.BoardFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

@RestController
@RequestMapping("/v2/boards")
@RequiredArgsConstructor
@Slf4j
public class BoardControllerV2 {

	private final BoardFacadeService boardFacadeService;

	@GetMapping
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getMainViewBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMainViewBoardsRefactoring(userSessionDto, pageRequest);
	}

	@GetMapping("/hot")
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getHotBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getHotBoardsRefactoring(userSessionDto, pageRequest);
	}

	@GetMapping("/members/{memberId}")
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getMemberBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page,
			@PathVariable("memberId") Long memberId) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMemberBoardsRefactoring(userSessionDto, memberId, pageRequest);
	}

	@GetMapping("/followings")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public BoardsPaginationDto getFollowingsBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getFollowingsBoardsRefactoring(userSessionDto, pageRequest);
	}

	@PostMapping(
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	)
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createBoard(
			@UserSession UserSessionDto userSessionDto,
			@Valid @ModelAttribute BoardCreateRequestDto boardCreateRequestDto) {
		boardFacadeService.createBoard(userSessionDto,
				boardCreateRequestDto.getMediaDataList(),
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
