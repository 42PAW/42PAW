package proj.pet.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;

@Service
@RequiredArgsConstructor
public class CommentFacadeServiceImpl implements CommentFacadeService {

	private final CommentService commentService;
	private final CommentQueryService commentQueryService;

	@Override
	public CommentResponseDto getCommentsByBoardId(Long boardId) {
		return null;
	}

	@Override
	public void createComment(CommentRequestDto commentRequestDto) {

	}

	@Override
	public void deleteComment(Long commentId) {

	}
}
