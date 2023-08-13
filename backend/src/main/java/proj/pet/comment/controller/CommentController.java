package proj.pet.comment.controller;

import lombok.RequiredArgsConstructor;
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
	public CommentResponseDto getCommentsByBoardId(Long boardId) {
		return commentFacadeService.getCommentsByBoardId(boardId);
	}

	@PostMapping
	public void createComment(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody CommentRequestDto commentRequestDto) {
		commentFacadeService.createComment(userSessionDto, commentRequestDto);
	}

	@DeleteMapping("/{commentId}")
	public void deleteComment(@PathVariable("commentId") Long commentId) {
		commentFacadeService.deleteComment(commentId);
	}
}
