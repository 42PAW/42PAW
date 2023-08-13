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

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;

@QueryService
@RequiredArgsConstructor
public class BoardQueryServiceImpl implements BoardQueryService {

	private final static String EMPTY_STRING = "";
	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final BoardMapper boardMapper;

	/**
	 * 메인 화면에 보여줄 게시글 목록을 가져온다.
	 * <p>
	 * 로그인하지 않은 유저 또한 조회가 가능하다.
	 *
	 * @param loginUserId 로그인한 유저의 id - 로그인하지 않았다면 0
	 * @param pageRequest 페이지 요청 정보
	 * @return
	 */
	@Override public BoardsResponseDto getMainViewBoards(Long loginUserId, PageRequest pageRequest) {
		Optional<Member> loginUser = memberRepository.findById(loginUserId);
		Set<Scrap> scraps = extractSetFromListIfExists(loginUser, Member::getScraps);
		Set<Reaction> reactions = extractSetFromListIfExists(loginUser, Member::getReactions);

		List<BoardInfoDto> result = boardRepository.getMainViewBoards(pageRequest).stream()
				.map(board -> {
					boolean isScrapped = scraps.stream().anyMatch(scrap -> scrap.getBoard().equals(board));
					boolean isReacted = reactions.stream().anyMatch(reaction -> reaction.getBoard().equals(board));
					int reactionCount = board.getReactions().size();
					int commentCount = board.getComments().size();
					Optional<Comment> latestComment = board.findLatestComment();
					String previewCommentUserName = latestComment.map(comment -> comment.getMember().getNickname()).orElse(EMPTY_STRING);
					String previewCommentContent = latestComment.map(Comment::getContent).orElse(EMPTY_STRING);
					return boardMapper.toBoardInfoDto(
							board, board.getMember(),
							board.findBoardMediaUrls(), board.getCategoriesAsSpecies(),
							isScrapped, isReacted,
							reactionCount, commentCount,
							previewCommentUserName, previewCommentContent
					);
				}).toList();
		return boardMapper.toBoardsResponseDto(result, result.size()); // TODO: result.size가 아닌 전체 길이를 가져오도록 수정
	}

	@Override public BoardsResponseDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		return null;
	}

	@Override public BoardsResponseDto getMemberBoards(Long loginUserId, Long memberId, PageRequest pageRequest) {
		return null;
	}

	/**
	 * entity가 존재하면 extractor를 통해 Set<E>를 추출하고, 존재하지 않으면 빈 Set<E>를 반환한다.
	 * <p>
	 * HashSet으로 매핑하는 오버헤드가 클 수 있으나, List의 원소가 충분히 많다면 복잡도가 개선될 수 있다.
	 *
	 * @param entity    Optional한 엔티티
	 * @param extractor 엔티티에서 List<E>를 추출하는 함수
	 * @param <T>       엔티티 타입
	 * @param <E>       List의 원소 타입 - 연관관계의 엔티티
	 * @return entity가 존재하면 extractor를 통해 추출한 Set<E>, 존재하지 않으면 빈 Set<E>
	 */
	private <T, E> Set<E> extractSetFromListIfExists(Optional<T> entity, Function<T, List<E>> extractor) {
		return entity
				.map(extractor)
				.map(HashSet::new)
				.orElseGet(HashSet::new);
	}


}
