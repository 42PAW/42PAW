package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.domain.*;
import proj.pet.board.dto.BoardMediaDto;
import proj.pet.board.repository.BoardCategoryFilterRepository;
import proj.pet.board.repository.BoardMediaRepository;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static proj.pet.exception.ExceptionStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final BoardCategoryFilterRepository boardCategoryFilterRepository;
	private final BoardMediaManager boardMediaManager;
	private final BoardMediaRepository boardMediaRepository;
	private final AnimalCategoryRepository animalCategoryRepository;

	// TODO: 책임 분산이 필요할지도? + mediaData의 ContentType이 not null임을 검증해야 함.
	// v1.5 이벤트로 미디어 업로드 책임 분리
	@Override public Board createBoard(Long memberId, List<Species> speciesList, List<BoardMediaDto> mediaDtoList, String content, LocalDateTime now) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new ServiceException(NOT_FOUND_MEMBER));
		Board board = boardRepository.save(Board.of(member, VisibleScope.PUBLIC, content, now));
		List<AnimalCategory> animalCategories = animalCategoryRepository.findBySpeciesIn(speciesList);
		List<BoardCategoryFilter> categoryFilters = animalCategories.stream()
				.map(category -> BoardCategoryFilter.of(board, category))
				.toList();
		categoryFilters = boardCategoryFilterRepository.saveAll(categoryFilters);
		board.addCategoryFilters(categoryFilters);
		List<BoardMedia> mediaList = mediaDtoList.stream()
				.map(dto -> {
					MultipartFile mediaData = dto.getMediaData();
					String mediaUrl = boardMediaManager.uploadMedia(mediaData);
					return BoardMedia.of(board, mediaUrl, dto.getIndex(), MediaType.from(mediaData.getContentType()));
				}).collect(Collectors.toList());
		mediaList = boardMediaRepository.saveAll(mediaList);
		board.addMediaList(mediaList);
		return boardRepository.save(board);
	}

	@Override public void deleteBoard(Long memberId, Long boardId) {
		Board board = boardRepository.findById(boardId).orElseThrow(() -> new ServiceException(NOT_FOUND_BOARD));
		if (!board.getMember().getId().equals(memberId)) {
			throw new ServiceException(UNAUTHENTICATED);
		}
		boardCategoryFilterRepository.deleteAll(board.getCategoryFilters());
		List<BoardMedia> mediaList = board.getMediaList();
		boardMediaManager.deleteMediaByList(mediaList);
		boardMediaRepository.deleteAll(mediaList);
		boardRepository.delete(board);
	}
}
