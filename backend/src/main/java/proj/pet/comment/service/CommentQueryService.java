package proj.pet.comment.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.comment.dto.CommentResponseDto;

public interface CommentQueryService {

	CommentResponseDto findCommentsByBoardId(Long boardId, PageRequest pageRequest);

}
