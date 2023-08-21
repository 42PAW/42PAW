package proj.pet.board.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.Species;
import proj.pet.mapper.BoardMapper;
import proj.pet.member.domain.Member;
import proj.pet.testutil.UnitTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;

class BoardQueryServiceImplTest extends UnitTest {

	private final BoardMapper boardMapper = BoardMapper.INSTANCE;
	@Mock
	private BoardRepository boardRepository;

	private BoardQueryServiceImpl boardQueryService;

	private static Board getMockBoardOf(Member author) {
		Board board = mock(Board.class);
		given(board.findBoardMediaUrls()).willReturn(List.of("url1", "url2"));
		given(board.getCategoriesAsSpecies()).willReturn(List.of(Species.CAT, Species.DOG));
		given(board.getMember()).willReturn(author);
		return board;
	}

	@BeforeEach
	void setUp() {
		boardQueryService = new BoardQueryServiceImpl(boardRepository, boardMapper);
	}

	@Test
	@DisplayName("사용자의 ID 기준 반응, 북마크 정보를 포함한 게시글들을 가져온다.")
	void getMainViewBoards() {
		// given
		Long loginUserId = 1L;
		Member author = mock(Member.class);
		Board board = getMockBoardOf(author);
		given(author.getId()).willReturn(2L);

		given(boardRepository.getMainViewBoards(PageRequest.of(0, 10)))
				.willReturn(List.of(board, board));

		// when
		BoardsPaginationDto mainViewBoards = boardQueryService.getMainViewBoards(loginUserId, PageRequest.of(0, 10));

		//then
		then(boardRepository).should().getMainViewBoards(PageRequest.of(0, 10));
		assertThat(mainViewBoards.getResult().size()).isEqualTo(2);
		assertThat(mainViewBoards.getResult().get(0).getCategories()).isEqualTo(List.of(Species.CAT, Species.DOG));
	}

	@Test
	@DisplayName("사용자의 ID 기준 반응, 북마크 정보를 포함한 HOT 게시글들을 가져온다.")
	void getHotBoards() {
		// given
		Long loginUserId = 1L;
		Member author = mock(Member.class);
		Board board = getMockBoardOf(author);
		given(author.getId()).willReturn(2L);

		given(boardRepository.getHotBoards(PageRequest.of(0, 10)))
				.willReturn(List.of(board, board));

		// when
		BoardsPaginationDto hotViewBoards = boardQueryService.getHotBoards(loginUserId, PageRequest.of(0, 10));

		//then
		then(boardRepository).should().getHotBoards(PageRequest.of(0, 10));
		assertThat(hotViewBoards.getResult().size()).isEqualTo(2);
		assertThat(hotViewBoards.getResult().get(0).getCategories()).isEqualTo(List.of(Species.CAT, Species.DOG));
	}

	@Test
	@DisplayName("사용자의 ID 기준 반응, 북마크 정보를 포함한 특정 멤버의 게시글들을 가져온다.")
	void getMemberBoards() {
		// given
		Long loginUserId = 1L;
		Member author = mock(Member.class);
		Board board = getMockBoardOf(author);
		given(author.getId()).willReturn(2L);

		given(boardRepository.getMemberBoards(author.getId(), PageRequest.of(0, 10)))
				.willReturn(List.of(board, board));

		// when
		BoardsPaginationDto hotViewBoards = boardQueryService.getMemberBoards(loginUserId, author.getId(), PageRequest.of(0, 10));

		//then
		then(boardRepository).should().getMemberBoards(author.getId(), PageRequest.of(0, 10));
		assertThat(hotViewBoards.getResult().size()).isEqualTo(2);
		assertThat(hotViewBoards.getResult().get(0).getCategories()).isEqualTo(List.of(Species.CAT, Species.DOG));
	}

	@Test
	@DisplayName("사용자의 ID 기준 반응, 북마크 정보를 포함한 스크랩한 게시물들을 가져온다.")
	void getScraps() {
		// given
		Long loginUserId = 1L;
		Member author = mock(Member.class);
		Board board = getMockBoardOf(author);
		given(author.getId()).willReturn(2L);

		given(boardRepository.getScrapBoards(loginUserId, PageRequest.of(0, 10)))
				.willReturn(List.of(board, board));

		// when
		BoardsPaginationDto hotViewBoards = boardQueryService.getScraps(loginUserId, PageRequest.of(0, 10));

		//then
		then(boardRepository).should().getScrapBoards(loginUserId, PageRequest.of(0, 10));
		assertThat(hotViewBoards.getResult().size()).isEqualTo(2);
		assertThat(hotViewBoards.getResult().get(0).getCategories()).isEqualTo(List.of(Species.CAT, Species.DOG));
	}

	@Test
	@DisplayName("사용자의 ID 기준 반응, 북마크 정보를 포함한 팔로잉 중인 멤버들의 게시글들을 가져온다.")
	void getFollowingsBoards() {
		// given
		Long loginUserId = 1L;
		Member author = mock(Member.class);
		Board board = getMockBoardOf(author);
		given(author.getId()).willReturn(2L);

		given(boardRepository.getFollowingsBoards(loginUserId, PageRequest.of(0, 10)))
				.willReturn(List.of(board, board));

		// when
		BoardsPaginationDto hotViewBoards = boardQueryService.getFollowingsBoards(loginUserId, PageRequest.of(0, 10));

		//then
		then(boardRepository).should().getFollowingsBoards(loginUserId, PageRequest.of(0, 10));
		assertThat(hotViewBoards.getResult().size()).isEqualTo(2);
		assertThat(hotViewBoards.getResult().get(0).getCategories()).isEqualTo(List.of(Species.CAT, Species.DOG));
	}
}
