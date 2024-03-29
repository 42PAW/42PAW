package proj.pet.board.service;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_BOARD;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Streamable;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;
import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.MemberCategoryFilterRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.mapper.BoardMapper;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;
import proj.pet.utils.annotations.QueryService;

@QueryService
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardQueryServiceImpl implements BoardQueryService {

	private final static String EMPTY_STRING = "";
	private final BoardRepository boardRepository;
	private final BoardMapper boardMapper;
	private final BlockRepository blockRepository;
	private final MemberCategoryFilterRepository memberCategoryFilterRepository;

	/**
	 * 찾아온 게시글들의 Page에서 차단 유저와 카테고리 필터로 필터링 후 {@link BoardInfoDto}로 변환하여 리스트로 반환한다.
	 *
	 * @param loginUserId 로그인한 유저의 id - 로그인하지 않았다면 0
	 *                    <br>   참고 : {@link proj.pet.member.domain.UserAspect}
	 * @param boardPages  변환할 게시글
	 * @return {@link List<BoardInfoDto>}
	 */
	private Streamable<Board> filteringBoards(Long loginUserId, Page<Board> boardPages) {
		List<Block> blocks = blockRepository.findAllByMemberIdToList(loginUserId);
		List<Long> blockIds = blocks.stream().map(block -> block.getTo().getId()).toList();
		List<Species> categories = (loginUserId == 0) ?
				Arrays.stream(Species.values()).toList() :
				memberCategoryFilterRepository.findAllByMemberIdWithJoin(loginUserId)
						.stream().map(MemberCategoryFilter::getSpecies).toList();
		return boardPages.filter(board -> !blockIds.contains(board.getMember().getId()))
				.filter(board -> categories.stream().anyMatch(category ->
						board.getCategoriesAsSpecies().contains(category)));
	}

	/**
	 * 게시글의 반응과 내용, 그리고 해당 게시글에 대한 사용자의 Scrap과 Reaction 여부를 포함한 {@link BoardInfoDto}로 변환한다.
	 *
	 * @param loginUserId 로그인한 유저의 id - 로그인하지 않았다면 0
	 *                    <br>   참고 : {@link proj.pet.member.domain.UserAspect}
	 * @param board       변환할 게시글
	 * @return {@link BoardInfoDto}
	 */
	private BoardInfoDto createBoardInfoDto(Long loginUserId, Board board) {
		List<Scrap> scrapsToBoard = board.getScraps();
		List<Reaction> reactionsToBoard = board.getReactions();
		List<Comment> commentsToBoard = board.getComments();

		boolean isUserScrapped = scrapsToBoard.stream()
				.anyMatch(scrap -> scrap.getMemberId().equals(loginUserId));
		boolean isUserReacted = reactionsToBoard.stream()
				.anyMatch(reaction -> reaction.getMemberId().equals(loginUserId));
		int reactionCount = reactionsToBoard.size();
		int commentCount = commentsToBoard.size();

		Optional<Comment> latestComment = commentsToBoard.stream()
				.max(Comparator.comparing(Comment::getCreatedAt));
		String previewCommentUserName = latestComment
				.map(comment -> comment.getMember().getNickname()).orElse(EMPTY_STRING);
		String previewCommentContent = latestComment
				.map(Comment::getContent).orElse(EMPTY_STRING);

		return boardMapper.toBoardInfoDto(
				board, board.getMember(),
				board.findBoardMediaUrls(), board.getCategoriesAsSpecies(),
				isUserScrapped, isUserReacted, reactionCount, commentCount,
				previewCommentUserName, previewCommentContent);
	}

	/**
	 * 메인 화면에 보여줄 게시글 목록을 가져온다.
	 * <p>
	 * 로그인하지 않은 유저 또한 조회가 가능하다.
	 *
	 * @param loginUserId 로그인한 유저의 id - 로그인하지 않았다면 0
	 *                    <br>   참고 : {@link proj.pet.member.domain.UserAspect}
	 *                    <br>
	 * @param pageRequest 페이지 요청 정보
	 * @return {@link BoardsPaginationDto} - 게시글 정보에 대한 페이지네이션
	 * @see proj.pet.member.domain.UserSession
	 */
	@Override
	public BoardsPaginationDto getMainViewBoards(Long loginUserId, PageRequest pageRequest) {
		Page<Board> boardPages = boardRepository.getMainViewBoards(pageRequest);
		List<BoardInfoDto> result = filteringBoards(loginUserId, boardPages).stream()
				.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, boardPages.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		Page<Board> boardPages = boardRepository.getHotBoards(pageRequest);
		Streamable<Board> filteredBoard = filteringBoards(loginUserId, boardPages);
		List<BoardInfoDto> result = filteredBoard.map(board ->
				createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, boardPages.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getMemberBoards(Long loginUserId, Long memberId,
			PageRequest pageRequest) {
		List<BoardInfoDto> result = boardRepository.getMemberBoards(memberId, pageRequest).stream()
				.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}

	@Override
	public BoardsPaginationDto getScrapBoards(Long loginUserId, PageRequest pageRequest) {
		Page<Board> scrapBoards = boardRepository.getScrapBoards(loginUserId, pageRequest);
		List<BoardInfoDto> result =
				scrapBoards.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, scrapBoards.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getFollowingsBoards(Long memberId, PageRequest pageRequest) {
		Page<Board> followingsBoards = boardRepository.getFollowingsBoards(memberId, pageRequest);
		List<BoardInfoDto> result = followingsBoards.stream()
				.map(board -> createBoardInfoDto(memberId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, followingsBoards.getTotalElements());
	}

	@Override
	public BoardInfoDto getBoard(Long memberId, Long boardId) {
		Board board = boardRepository.findById(boardId)
				.orElseThrow(NOT_FOUND_BOARD::asServiceException);
		return createBoardInfoDto(memberId, board);
	}
}
