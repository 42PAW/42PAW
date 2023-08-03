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
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;

	private final MemberRepository memberRepository;

	private final BoardCategoryFilterRepository boardCategoryFilterRepository;

	private final BoardMediaManager boardMediaManager;

	private final BoardMediaRepository boardMediaRepository;

	@Override public void createBoard(Long memberId, List<AnimalCategory> categoryList, List<BoardMediaDto> mediaDtoList, String content, LocalDateTime now) {
		Member member = memberRepository.findById(memberId).orElseThrow();
		Board board = Board.of(member, VisibleScope.PUBLIC, content, now);
		List<BoardCategoryFilter> categoryFilters = categoryList.stream()
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
		boardRepository.save(board);
	}

	@Override public void deleteBoard(Long memberId, Long boardId) {

	}
}
