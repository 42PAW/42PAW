package proj.pet.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.comment.dto.CommentRequestDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.member.dto.UserSessionDto;

import java.time.LocalDateTime;

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
	public void createComment(UserSessionDto userSessionDto, CommentRequestDto commentRequestDto) {
		commentService.addCommentToBoard(userSessionDto.getMemberId(), commentRequestDto.getBoardId(), commentRequestDto.getContent(), LocalDateTime.now());

	}

	@Override
	public void deleteComment(Long commentId) {

	}
}
