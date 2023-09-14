package proj.pet.comment.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.comment.dto.CommentCreateRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.member.dto.UserSessionDto;

public interface CommentFacadeService {

	CommentResponseDto getCommentsByBoardId(UserSessionDto userSessionDto, Long boardId, PageRequest pageRequest);

	void createComment(UserSessionDto userSessionDto, CommentCreateRequestDto commentCreateRequestDto);

	void deleteComment(UserSessionDto userSessionDto, Long commentId);
}
