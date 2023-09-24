package proj.pet.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import proj.pet.comment.dto.CommentDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.follow.domain.FollowType;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.mapper.CommentMapper;
import proj.pet.utils.annotations.QueryService;

import java.util.List;

@QueryService
@RequiredArgsConstructor
public class CommentQueryServiceImpl implements CommentQueryService {

	private final CommentRepository commentRepository;
	private final CommentMapper commentMapper;
	private final FollowRepository followRepository;

	@Override
	public CommentResponseDto findCommentsByBoardId(Long loginUserId, Long boardId, PageRequest pageRequest) {
		List<CommentDto> comments = commentRepository.findDescOrderByBoardId(boardId, pageRequest)
				.map(comment -> {
					FollowType followType = followRepository.existsByFromIdAndToId(loginUserId, comment.getMember().getId()) ? FollowType.FOLLOWING : FollowType.NONE;
					return commentMapper.toCommentDto(comment, comment.getMember(), followType);
				}).toList();
		return commentMapper.toCommentResponseDto(comments, pageRequest.getPageSize()); // pageSize 총 개수로 변경
	}
}
