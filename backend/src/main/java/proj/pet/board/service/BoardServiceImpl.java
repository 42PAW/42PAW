package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMediaManager;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.dto.BoardMediaDto;
import proj.pet.board.repository.BoardCategoryFilterRepository;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.mapper.BoardMapper;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;

	private final MemberRepository memberRepository;

	private final BoardCategoryFilterRepository boardCategoryFilterRepository;

	private final BoardMediaManager boardMediaManager;

	private final BoardMapper boardMapper;

	@Override public void createBoard(Long memberId, List<AnimalCategory> categoryList, List<BoardMediaDto> mediaDataList, String content, LocalDateTime now) {
		Member member = memberRepository.findById(memberId).orElseThrow();
		Board board = Board.of(member, VisibleScope.PUBLIC, content, now);
		List<BoardCategoryFilter> categoryFilters = categoryList.stream()
				.map(category -> BoardCategoryFilter.of(board, category))
				.toList();
		categoryFilters = boardCategoryFilterRepository.saveAll(categoryFilters);
		board.addCategoryFilters(categoryFilters);
		mediaDataList.stream()
				.map(mediaData -> {
					String mediaUrl = boardMediaManager.uploadMedia(mediaData.getMediaData());
					return null;
				});
		boardRepository.save(board);
	}

	@Override public void deleteBoard(Long memberId, Long boardId) {

	}
}
