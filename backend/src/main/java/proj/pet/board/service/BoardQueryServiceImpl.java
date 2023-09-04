package proj.pet.board.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Streamable;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;
import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.repository.MemberCategoryFilterRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.mapper.BoardMapper;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;
import proj.pet.utils.annotations.QueryService;

@QueryService
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
	 * @param loginUserId      로그인한 유저의 id - 로그인하지 않았다면 0
	 *                         <br>   참고 : {@link proj.pet.member.domain.UserAspect}
	 * @param boardPages       변환할 게시글
	 * @param blocks           로그인한 유저가 차단한 유저들의 목록
	 * @param animalCategories 로그인한 유저가 선택한 카테고리 필터
	 * @return {@link List<BoardInfoDto>}
	 */
	private List<BoardInfoDto> getBoardInfoDtos(Long loginUserId, Page<Board> boardPages,
			List<Block> blocks, List<AnimalCategory> animalCategories) {
		Streamable<Board> filtered = boardPages.filter(board -> blocks.stream().noneMatch(
				block -> block.getTo().getId().equals(board.getMember().getId())));
		if (!animalCategories.isEmpty()) {
			filtered = filtered.filter(board ->
					animalCategories.stream().anyMatch(animalCategory ->
							board.getCategoriesAsSpecies()
									.contains(animalCategory.getSpecies())));
		}
		return filtered.map(board -> createBoardInfoDto(loginUserId, board)).toList();
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
				isUserScrapped, isUserReacted,
				reactionCount, commentCount,
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
		//TODO: QueryDSL로 리팩토링 여부 결정하기
		List<Block> blocks = blockRepository.findAllByMemberIdToList(loginUserId);
		List<AnimalCategory> animalCategories =
				memberCategoryFilterRepository.findAllByMemberIdWithJoin(loginUserId)
						.stream().map(MemberCategoryFilter::getAnimalCategory).toList();
		Page<Board> boardPages = boardRepository.getMainViewBoards(pageRequest);
		List<BoardInfoDto> result = getBoardInfoDtos(loginUserId, boardPages, blocks,
				animalCategories);
		return boardMapper.toBoardsResponseDto(result, boardPages.getTotalElements());
	}

	// TODO: result.size가 아닌 전체 길이를 가져오도록 수정 및 최적화 필요, 혹시 변할 수도 있으니 아직 함수 중복에 대해서는 리팩터링하지 않았음.

	@Override
	public BoardsPaginationDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		//TODO: QueryDSL로 리팩토링 여부 결정하기
		List<Block> blocks = blockRepository.findAllByMemberIdToList(loginUserId);
		List<AnimalCategory> animalCategories =
				memberCategoryFilterRepository.findAllByMemberIdWithJoin(loginUserId)
						.stream().map(MemberCategoryFilter::getAnimalCategory).toList();
		Page<Board> boardPages = boardRepository.getHotBoards(pageRequest);
		List<BoardInfoDto> result =
				getBoardInfoDtos(loginUserId, boardPages, blocks, animalCategories);
		return boardMapper.toBoardsResponseDto(result, boardPages.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getMemberBoards(Long loginUserId, Long memberId,
			PageRequest pageRequest) {
		List<BoardInfoDto> result = boardRepository.getMemberBoards(memberId, pageRequest).stream()
				.map(board -> createBoardInfoDto(loginUserId, board))
				.toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}

	@Override
	public BoardsPaginationDto getScraps(Long loginUserId, PageRequest pageRequest) {
		Page<Board> scrapBoards = boardRepository.getScrapBoards(loginUserId, pageRequest);
		List<BoardInfoDto> result =
				scrapBoards.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, scrapBoards.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getFollowingsBoards(Long memberId, PageRequest pageRequest) {
		System.out.println("memberId = " + memberId);
		System.out.println("pageRequest = " + pageRequest);
		Page<Board> followingsBoards = boardRepository.getFollowingsBoards(memberId, pageRequest);
		System.out.println("followingsBoards = " + followingsBoards);
		List<BoardInfoDto> result = followingsBoards
				.stream()
				.map(board -> createBoardInfoDto(memberId, board))
				.toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}
}
