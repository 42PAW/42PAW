package proj.pet.comment.service;

import java.time.LocalDateTime;

public interface CommentService {

	void addCommentToBoard(Long memberId, Long boardId, String content, LocalDateTime now);
}
