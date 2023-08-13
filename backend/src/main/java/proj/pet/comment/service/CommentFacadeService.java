package proj.pet.comment.service;

import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.member.dto.UserSessionDto;

public interface CommentFacadeService {

	CommentResponseDto getCommentsByBoardId(Long boardId);

	void createComment(UserSessionDto userSessionDto, CommentRequestDto commentRequestDto);

	void deleteComment(Long commentId);
}
