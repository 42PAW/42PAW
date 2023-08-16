package proj.pet.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.service.BoardFacadeService;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

import java.util.List;

@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardFacadeService boardFacadeService;

	@GetMapping
	public BoardsPaginationDto getMainViewBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMainViewBoards(userSessionDto, pageRequest);
	}

	@GetMapping("/hot")
	public BoardsPaginationDto getHotBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getHotBoards(userSessionDto, pageRequest);
	}

	@GetMapping("/members/{memberId}")
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

	@PostMapping(
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	)
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createBoard(
			@UserSession UserSessionDto userSessionDto,
			@RequestPart(value = "mediaDataList") List<MultipartFile> mediaDataList,
			@RequestPart(value = "categoryList") List<Species> categoryList,
			@RequestPart(value = "content") String content) {
		boardFacadeService.createBoard(userSessionDto, mediaDataList, categoryList, content);
	}

	@DeleteMapping("/{boardId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteBoard(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("boardId") Long boardId) {
		boardFacadeService.deleteBoard(userSessionDto, boardId);
	}
}
