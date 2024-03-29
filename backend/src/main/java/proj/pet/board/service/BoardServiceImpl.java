package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.*;
import proj.pet.board.repository.BoardMediaRepository;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.BoardCategoryFilterRepository;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.exception.ExceptionStatus;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static proj.pet.exception.ExceptionStatus.*;

/**
 * Board의 CUD 비즈니스 로직을 담당하는 서비스 구현체
 */
@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final BoardCategoryFilterRepository boardCategoryFilterRepository;
	private final BoardMediaManager boardMediaManager;
	private final BoardMediaRepository boardMediaRepository;
	private final CommentRepository commentRepository;

	// TODO: 책임 분산이 필요할지도? + mediaData의 ContentType이 not null임을 검증해야 함.
	// v1.5 이벤트로 미디어 업로드 책임 분리


	/**
	 * {@inheritDoc}
	 *
	 * @throws ServiceException {@link ExceptionStatus#NOT_FOUND_MEMBER} 해당하는 멤버가 없을 경우
	 */
	@Override
	public Board createBoard(
			Long memberId,
			List<Species> speciesList,
			List<String> mediaDataList,
			String content,
			LocalDateTime now
	) {
		// TODO: 컨트롤러 & 정책으로 빼기
		if (speciesList == null || speciesList.isEmpty()) {
			throw new ServiceException(INVALID_ARGUMENT, "동물 카테고리를 선택해주세요.");
		}
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = boardRepository.save(
				Board.of(member, VisibleScope.PUBLIC, content, now));
		List<BoardCategoryFilter> categoryFilters = convertToBoardCategoryFilters(speciesList, board);
		categoryFilters = boardCategoryFilterRepository.saveAll(categoryFilters);
		board.addCategoryFilters(categoryFilters);

		List<BoardMedia> mediaList = convertToBoardMedia(mediaDataList, board);
		mediaList = boardMediaRepository.saveAll(mediaList);
		board.addMediaList(mediaList);

		return boardRepository.save(board);
	}

	private List<BoardCategoryFilter> convertToBoardCategoryFilters(
			List<Species> animalCategories, Board board) {
		return animalCategories.stream()
				.map(category -> BoardCategoryFilter.of(board, category))
				.toList();
	}

	private List<BoardMedia> convertToBoardMedia(List<String> mediaUrlList, Board board) {
		AtomicInteger index = new AtomicInteger(0);
		List<BoardMedia> mediaList = mediaUrlList.stream().map(url -> {
					return BoardMedia.of(board, url, index.getAndIncrement(), MediaType.IMAGE);
					//TODO MEDIA TYPE 유동적으로 받도록 하는 부분 필요
				})
				.toList();
		return mediaList;
	}

	/**
	 * {@inheritDoc}
	 *
	 * @throws ServiceException {@link ExceptionStatus#NOT_FOUND_BOARD} 해당하는 게시글이 없을 경우
	 * @throws ServiceException {@link ExceptionStatus#UNAUTHENTICATED} 해당 게시글을 삭제할 권한이 없을 경우 - 본인의
	 *                          게시글이 아닐 때
	 */
	@Override
	public void deleteBoard(Long memberId, Long boardId) {
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = boardRepository.findById(boardId)
				.orElseThrow(NOT_FOUND_BOARD::asServiceException);
		if (board.getDeletedAt() != null) {
			throw ALREADY_DELETED_BOARD.asServiceException();
		}
		if (!board.isOwnedBy(member)) {
			throw UNAUTHENTICATED.asServiceException();
		}
		if (!board.getComments().isEmpty()) {
			commentRepository.deleteAll(board.getComments());
		}
		boardCategoryFilterRepository.deleteAll(board.getCategoryFilters());
		boardMediaRepository.deleteAll(board.getMediaList());
		board.delete();
	}
}
