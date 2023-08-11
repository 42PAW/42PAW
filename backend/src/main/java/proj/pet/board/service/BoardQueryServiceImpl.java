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

import java.util.*;

@QueryService
@RequiredArgsConstructor
public class BoardQueryServiceImpl implements BoardQueryService {

	private final static Long NON_REGISTERED_USER_ID = 0L;
	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final BoardMapper boardMapper;

	@Override public BoardsResponseDto getMainViewBoards(Long loginUserId, PageRequest pageRequest) {
		Set<Scrap> scraps;
		Set<Reaction> reactions;
		Optional<Member> loginUser = memberRepository.findById(loginUserId);
		if (loginUser.isPresent()) {
			scraps = new HashSet<>(loginUser.get().getScraps());
			reactions = new HashSet<>(loginUser.get().getReactions());
		} else {
			scraps = new HashSet<>();
			reactions = new HashSet<>();
		}
		List<BoardInfoDto> result = boardRepository.getMainViewBoards(pageRequest).stream()
				.map(board -> {
					boolean isScrapped = scraps.stream().anyMatch(scrap -> scrap.getBoard().getId().equals(board.getId()));
					boolean isReacted = reactions.stream().anyMatch(reaction -> reaction.getBoard().getId().equals(board.getId()));
					int reactionCount = board.getReactions().size();
					int commentCount = board.getComments().size();
					Optional<Comment> latestComment = board.getComments().stream().max(Comparator.comparing(Comment::getCreatedAt));
					String previewCommentUserName = "";
					String previewCommentContent = "";
					if (latestComment.isPresent()) {
						previewCommentUserName = latestComment.get().getMember().getNickname();
						previewCommentContent = latestComment.get().getContent();
					}
					return boardMapper.toBoardInfoDto(
							board, board.getMember(),
							board.getBoardMediaUrls(), board.getCategoriesAsSpecies(),
							isScrapped, isReacted,
							reactionCount, commentCount,
							previewCommentUserName, previewCommentContent
					);
				}).toList();
		return boardMapper.toBoardsResponseDto(result, 1); // totallength는 임시로 1로 설정
	}

	@Override public BoardsResponseDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		return null;
	}

	@Override public BoardsResponseDto getMemberBoards(Long loginUserId, Long memberId, PageRequest pageRequest) {
		return null;
	}
}
