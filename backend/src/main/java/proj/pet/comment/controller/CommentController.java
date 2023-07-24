package proj.pet.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.comment.service.CommentFacadeService;

@RestController("/v1/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentFacadeService commentFacadeService;

	@GetMapping("/boards/{boardId}")
	public CommentResponseDto getCommentsByBoardId(Long boardId) {
		return commentFacadeService.getCommentsByBoardId(boardId);
	}

	@PostMapping("")
	public void createComment(@RequestBody CommentRequestDto commentRequestDto) {
		commentFacadeService.createComment(commentRequestDto);
	}

	@DeleteMapping("/{commentId}")
	public void deleteComment(@PathVariable("commentId") Long commentId) {
		commentFacadeService.deleteComment(commentId);
	}
}
