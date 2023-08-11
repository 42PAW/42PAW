package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.repository.BoardRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.mapper.BoardMapper;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;
import proj.pet.utils.annotations.QueryService;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static proj.pet.exception.ExceptionStatus.INCORRECT_ARGUMENT;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@QueryService
@RequiredArgsConstructor
public class BoardQueryServiceImpl implements BoardQueryService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final BoardMapper boardMapper;

	@Override public BoardsResponseDto getMainViewBoards(Long loginUserId, PageRequest pageRequest) {
		Member me = memberRepository.findById(loginUserId).orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		Set<Reaction> reactions = new HashSet<>(me.getReactions());
		Set<Scrap> scraps = new HashSet<>(me.getScraps());
		List<BoardInfoDto> result = boardRepository.getMainViewBoards(pageRequest).stream()
				.map(board -> {
					boolean isScrapped = scraps.stream().anyMatch(scrap -> scrap.getBoard().getId().equals(board.getId()));
					boolean isReacted = reactions.stream().anyMatch(reaction -> reaction.getBoard().getId().equals(board.getId()));
					int reactionCount = board.getReactions().size();
					int commentCount = board.getComments().size();
					Comment latestComment = board.getComments().stream().max(Comparator.comparing(Comment::getCreatedAt))
							.orElseThrow(INCORRECT_ARGUMENT::toServiceException);
					return boardMapper.toBoardInfoDto(
							board, board.getMember(),
							board.getBoardMediaUrls(), board.getCategoriesAsSpecies(),
							isScrapped, isReacted,
							reactionCount, commentCount,
							latestComment.getMember().getNickname(), latestComment.getContent());
				}).toList();
		return boardMapper.toBoardsResponseDto(result, pageRequest.getPageSize());
	}

	@Override public BoardsResponseDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		return null;
	}

	@Override public BoardsResponseDto getMemberBoards(Long loginUserId, Long memberId, PageRequest pageRequest) {
		return null;
	}
}
