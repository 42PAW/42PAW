package proj.pet.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.comment.dto.CommentCreateRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.member.dto.UserSessionDto;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentFacadeServiceImpl implements CommentFacadeService {

	private final CommentService commentService;
	private final CommentQueryService commentQueryService;
	private final CommentEventPublisher commentEventPublisher;

	@Transactional(readOnly = true)
	@Override
	public CommentResponseDto getCommentsByBoardId(UserSessionDto userSessionDto, Long boardId, PageRequest pageRequest) {
		return commentQueryService.findCommentsByBoardId(userSessionDto.getMemberId(), boardId, pageRequest);
	}

	@Override
	public void createComment(UserSessionDto userSessionDto, CommentCreateRequestDto commentCreateRequestDto) {
		commentService.addCommentToBoard(userSessionDto.getMemberId(), commentCreateRequestDto.getBoardId(), commentCreateRequestDto.getContent(), LocalDateTime.now());
		commentEventPublisher.publish(commentCreateRequestDto.getBoardId(), userSessionDto.getMemberId());
	}

	@Transactional
	@Override
	public void deleteComment(UserSessionDto userSessionDto, Long commentId) {
		commentService.deleteComment(userSessionDto.getMemberId(), commentId);
	}
}
