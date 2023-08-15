package proj.pet.comment.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.member.dto.UserSessionDto;

public interface CommentFacadeService {

	CommentResponseDto getCommentsByBoardId(Long boardId, PageRequest pageRequest);

	void createComment(UserSessionDto userSessionDto, CommentRequestDto commentRequestDto);

	void deleteComment(UserSessionDto userSessionDto, Long commentId);
}
