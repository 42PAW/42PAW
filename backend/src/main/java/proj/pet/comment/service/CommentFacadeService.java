package proj.pet.comment.service;

import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;

public interface CommentFacadeService {

	CommentResponseDto getCommentsByBoardId(Long boardId);

	void createComment(CommentRequestDto commentRequestDto);

	void deleteComment(Long commentId);
}
