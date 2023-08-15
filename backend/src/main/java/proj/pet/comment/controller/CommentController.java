package proj.pet.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.comment.service.CommentFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

@RestController
@RequestMapping("/v1/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentFacadeService commentFacadeService;

	@GetMapping("/boards/{boardId}")
	public CommentResponseDto getCommentsByBoardId(
			@PathVariable("boardId") Long boardId,
			@RequestParam("page") int page,
			@RequestParam("size") int size) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return commentFacadeService.getCommentsByBoardId(boardId, pageRequest);
	}

	@PostMapping
	public void createComment(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody CommentRequestDto commentRequestDto) {
		commentFacadeService.createComment(userSessionDto, commentRequestDto);
	}

	@DeleteMapping("/{commentId}")
	public void deleteComment(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("commentId") Long commentId) {
		commentFacadeService.deleteComment(userSessionDto, commentId);
	}
}
