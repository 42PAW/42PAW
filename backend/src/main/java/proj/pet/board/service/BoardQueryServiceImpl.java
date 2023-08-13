package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.domain.Board;
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
	 * @return {@link BoardsResponseDto} - 게시글 정보에 대한 페이지네이션
	 * @see proj.pet.member.domain.UserSession
	 * @see proj.pet.member.domain.UserAspect
	 */
	@Override public BoardsResponseDto getMainViewBoards(Long loginUserId, PageRequest pageRequest) {
		Optional<Member> loginUser = memberRepository.findById(loginUserId);
		Set<Scrap> scraps = extractSetFromListIfExists(loginUser, Member::getScraps);
		Set<Reaction> reactions = extractSetFromListIfExists(loginUser, Member::getReactions);

		List<BoardInfoDto> result = boardRepository.getMainViewBoards(pageRequest).stream()
				.map(board -> createBoardInfoDto(scraps, reactions, board))
				.toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}
	// TODO: result.size가 아닌 전체 길이를 가져오도록 수정 및 최적화 필요, 혹시 변할 수도 있으니 아직 함수 중복에 대해서는 리팩터링하지 않았음.

	@Override public BoardsResponseDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		Optional<Member> loginUser = memberRepository.findById(loginUserId);
		Set<Scrap> scraps = extractSetFromListIfExists(loginUser, Member::getScraps);
		Set<Reaction> reactions = extractSetFromListIfExists(loginUser, Member::getReactions);

		List<BoardInfoDto> result = boardRepository.getHotBoards(pageRequest).stream()
				.map(board -> createBoardInfoDto(scraps, reactions, board))
				.toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}

	@Override public BoardsResponseDto getMemberBoards(Long loginUserId, Long memberId, PageRequest pageRequest) {
		Optional<Member> loginUser = memberRepository.findById(loginUserId);
		Set<Scrap> scraps = extractSetFromListIfExists(loginUser, Member::getScraps);
		Set<Reaction> reactions = extractSetFromListIfExists(loginUser, Member::getReactions);

		List<BoardInfoDto> result = boardRepository.getMemberBoards(memberId, pageRequest).stream()
				.map(board -> createBoardInfoDto(scraps, reactions, board))
				.toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}

	/**
	 * 게시글의 반응과 내용, 그리고 해당 게시글에 대한 사용자의 Scrap과 Reaction 여부를 포함한 {@link BoardInfoDto}로 변환한다.
	 *
	 * @param scraps    사용자의 전체 Scrap의 Set
	 * @param reactions 사용자의 전체 Reaction의 Set
	 * @param board     게시글
	 * @return {@link BoardInfoDto}
	 */
	private BoardInfoDto createBoardInfoDto(Collection<Scrap> scraps, Collection<Reaction> reactions, Board board) {
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
				previewCommentUserName, previewCommentContent);
	}

	/**
	 * entity가 존재하면 extractor를 통해 List<E>를 추출하고, Set<E>로 변환하여 반환한다.
	 * <p>
	 * HashSet으로 매핑하는 오버헤드가 클 수 있으나, List의 원소가 충분히 많다면 복잡도가 개선될 수 있다.
	 *
	 * @param entity    Optional한 엔티티
	 * @param extractor 엔티티에서 List<E>를 추출하는 함수
	 * @param <T>       엔티티 타입
	 * @param <E>       List의 원소 타입 - 연관관계의 엔티티
	 * @return entity가 존재하면 extractor를 통해 추출한 Set<E>, 존재하지 않으면 빈 Set<E>
	 *  TODO: 언젠가는 옮길건데 Util 클래스로 사용할 수 있을 것 같다는 생각이 듦.
	 */
	private <T, E> Set<E> extractSetFromListIfExists(Optional<T> entity, Function<T, List<E>> extractor) {
		return entity
				.map(extractor)
				.map(HashSet::new)
				.orElseGet(HashSet::new);
	}


}
