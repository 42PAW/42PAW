package proj.pet.board.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Streamable;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;
import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardViewMapDto;
import proj.pet.board.dto.BoardViewSubDto;
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

	private List<BoardInfoDto> boardMappingToDto(List<Long> boardIds,
			BoardViewSubDto boardViewSubDto, Page<Board> boardPage) {
		Map<Long, BoardViewMapDto> boardViewMap = new HashMap<>();
		boardIds.forEach(boardId -> boardViewMap.put(boardId, new BoardViewMapDto()));
		boardViewSubDto.getMediaList().forEach(boardMedia -> {
			Long boardId = boardMedia.getBoard().getId();
			BoardViewMapDto boardViewMapDto = boardViewMap.get(boardId);
			if (boardViewMapDto.getImages() == null) {
				boardViewMapDto.setImages(new ArrayList<>());
			}
			boardViewMapDto.getImages().add(boardMedia.getMediaUrl());
		});
		boardViewSubDto.getReactionCounts().forEach(boardReactionCountDto -> {
			Long boardId = boardReactionCountDto.getBoardId();
			BoardViewMapDto boardViewMapDto = boardViewMap.get(boardId);
			boardViewMapDto.setReactionCount(boardReactionCountDto.getReactionCount().intValue());
		});
		boardViewSubDto.getComments().stream()
				.sorted(Comparator.comparing(Comment::getCreatedAt))
				.forEach(comment -> {
					Long boardId = comment.getBoard().getId();
					BoardViewMapDto boardViewMapDto = boardViewMap.get(boardId);
					boardViewMapDto.setCommentCount(boardViewMapDto.getCommentCount() + 1);
					if (boardViewMapDto.getPreviewCommentUser() == null) {
						boardViewMapDto.setPreviewCommentUser(comment.getMember().getNickname());
						boardViewMapDto.setPreviewComment(comment.getContent());
					}
				});
		boardViewSubDto.getMyReaction().forEach(reaction -> {
			Long boardId = reaction.getBoard().getId();
			BoardViewMapDto boardViewMapDto = boardViewMap.get(boardId);
			boardViewMapDto.setReacted(true);
		});
		boardViewSubDto.getMyScrap().forEach(scrap -> {
			Long boardId = scrap.getBoard().getId();
			BoardViewMapDto boardViewMapDto = boardViewMap.get(boardId);
			boardViewMapDto.setScrapped(true);
		});
		boardViewSubDto.getCategories().forEach(boardCategoryFilter -> {
			Long boardId = boardCategoryFilter.getBoard().getId();
			BoardViewMapDto boardViewMapDto = boardViewMap.get(boardId);
			if (boardViewMapDto.getCategories() == null) {
				boardViewMapDto.setCategories(new ArrayList<>());
			}
			boardViewMapDto.getCategories().add(boardCategoryFilter.getSpecies());
		});
		return boardPage.stream().map(board -> {
			BoardViewMapDto boardViewMapDto = boardViewMap.get(board.getId());
			return boardMapper.toBoardInfoDto(board, board.getMember(), boardViewMapDto);
		}).toList();
	}

	private List<BoardInfoDto> getBoardInfoDtos(Long loginUserId, List<Long> boardIds,
			Page<Board> boardPage) {
		BoardViewSubDto boardViewSubDto =
				boardRepository.getBoardViewWithBoardIdList(loginUserId, boardIds);
		return boardMappingToDto(boardIds, boardViewSubDto, boardPage);
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
	//TODO: PROD에서 성능 테스트 후 둘 중 하나 삭제
	@Override
	public BoardsPaginationDto getMainViewBoards(Long loginUserId, PageRequest pageRequest) {
		Page<Board> boardPages = boardRepository.getMainViewBoards(pageRequest);
		List<BoardInfoDto> result = filteringBoards(loginUserId, boardPages).stream()
				.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, boardPages.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getMainViewBoardsRefactoring(
			Long loginUserId, PageRequest pageRequest) {
		Page<Board> boardPage = boardRepository.finaAllOrderByCreatedAtDesc(pageRequest);
		List<Long> boardIds = filteringBoards(loginUserId, boardPage).map(Board::getId).toList();
		List<BoardInfoDto> result = getBoardInfoDtos(loginUserId, boardIds, boardPage);
		return boardMapper.toBoardsResponseDto(result, boardPage.getTotalElements());
	}

	//TODO: PROD에서 성능 테스트 후 둘 중 하나 삭제
	@Override
	public BoardsPaginationDto getHotBoards(Long loginUserId, PageRequest pageRequest) {
		Page<Board> boardPages = boardRepository.getHotBoards(pageRequest);
		Streamable<Board> filteredBoard = filteringBoards(loginUserId, boardPages);
		List<BoardInfoDto> result = filteredBoard.map(board ->
				createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, boardPages.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getHotBoardsRefactoring(Long loginUserId, PageRequest pageRequest) {
		Page<Board> boardPage = boardRepository.findAllOrderByReactionCountDesc(pageRequest);
		List<Long> boardIds = filteringBoards(loginUserId, boardPage).map(Board::getId).toList();
		List<BoardInfoDto> result = getBoardInfoDtos(loginUserId, boardIds, boardPage);
		return boardMapper.toBoardsResponseDto(result, boardPage.getTotalElements());
	}

	//TODO: PROD에서 성능 테스트 후 둘 중 하나 삭제
	@Override
	public BoardsPaginationDto getMemberBoards(Long loginUserId, Long memberId,
			PageRequest pageRequest) {
		List<BoardInfoDto> result = boardRepository.getMemberBoards(memberId, pageRequest).stream()
				.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, result.size());
	}

	@Override
	public BoardsPaginationDto getMemberBoardsRefactoring(Long loginUserId, Long memberId,
			PageRequest pageRequest) {
		Page<Board> memberBoards = boardRepository.getMemberBoards(memberId, pageRequest);
		List<Long> boardIds = memberBoards.stream().map(Board::getId).toList();
		List<BoardInfoDto> result = getBoardInfoDtos(loginUserId, boardIds, memberBoards);
		return boardMapper.toBoardsResponseDto(result, memberBoards.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getScrapBoards(Long loginUserId, PageRequest pageRequest) {
		Page<Board> scrapBoards = boardRepository.getScrapBoards(loginUserId, pageRequest);
		List<BoardInfoDto> result =
				scrapBoards.map(board -> createBoardInfoDto(loginUserId, board)).toList();
		return boardMapper.toBoardsResponseDto(result, scrapBoards.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getScrapBoardsRefactoring(Long loginUserId,
			PageRequest pageRequest) {
		Page<Board> scrapBoards = boardRepository.getScrapBoards(loginUserId, pageRequest);
		List<Long> boardIds = scrapBoards.stream().map(Board::getId).toList();
		List<BoardInfoDto> result = getBoardInfoDtos(loginUserId, boardIds, scrapBoards);
		return boardMapper.toBoardsResponseDto(result, scrapBoards.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getFollowingsBoards(Long memberId, PageRequest pageRequest) {
		Page<Board> followingsBoards = boardRepository.getFollowingsBoards(memberId, pageRequest);
		List<BoardInfoDto> result = followingsBoards
				.stream()
				.map(board -> createBoardInfoDto(memberId, board))
				.toList();
		return boardMapper.toBoardsResponseDto(result, followingsBoards.getTotalElements());
	}

	@Override
	public BoardsPaginationDto getFollowingsBoardsRefactoring(Long memberId,
			PageRequest pageRequest) {
		Page<Board> followingsBoards = boardRepository.getFollowingsBoards(memberId, pageRequest);
		List<Long> boardIds = followingsBoards.stream().map(Board::getId).toList();
		List<BoardInfoDto> result = getBoardInfoDtos(memberId, boardIds, followingsBoards);
		return boardMapper.toBoardsResponseDto(result, followingsBoards.getTotalElements());
	}
}
