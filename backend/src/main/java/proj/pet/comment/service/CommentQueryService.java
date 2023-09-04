package proj.pet.comment.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.comment.dto.CommentResponseDto;

public interface CommentQueryService {

	CommentResponseDto findCommentsByBoardId(Long loginUserId, Long boardId, PageRequest pageRequest);

}
