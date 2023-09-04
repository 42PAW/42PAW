package proj.pet.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.comment.service.CommentFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

import static proj.pet.auth.domain.AuthLevel.ANYONE;

@RestController
@RequestMapping("/v1/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentFacadeService commentFacadeService;

	@GetMapping("/boards/{boardId}")
	@AuthGuard(level = ANYONE)
	public CommentResponseDto getCommentsByBoardId(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("boardId") Long boardId,
			@RequestParam("page") int page,
			@RequestParam("size") int size) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return commentFacadeService.getCommentsByBoardId(userSessionDto, boardId, pageRequest);
	}

	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createComment(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody CommentRequestDto commentRequestDto) {
		commentFacadeService.createComment(userSessionDto, commentRequestDto);
	}

	@DeleteMapping("/{commentId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteComment(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("commentId") Long commentId) {
		commentFacadeService.deleteComment(userSessionDto, commentId);
	}
}
