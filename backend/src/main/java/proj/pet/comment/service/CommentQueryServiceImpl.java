package proj.pet.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import proj.pet.comment.dto.CommentDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.mapper.CommentMapper;
import proj.pet.utils.annotations.QueryService;

import java.util.List;

@QueryService
@RequiredArgsConstructor
public class CommentQueryServiceImpl implements CommentQueryService {

	private final CommentRepository commentRepository;
	private final CommentMapper commentMapper;

	@Override
	public CommentResponseDto findCommentsByBoardId(Long boardId, PageRequest pageRequest) {
		List<CommentDto> comments = commentRepository.findByBoardId(boardId, pageRequest)
				.map(comment -> commentMapper.toCommentDto(comment, comment.getMember())).toList();
		return commentMapper.toCommentResponseDto(comments, pageRequest.getPageSize()); // pageSize 총 개수로 변경
	}
}
