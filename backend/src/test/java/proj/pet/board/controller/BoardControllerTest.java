package proj.pet.board.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.domain.MediaType;
import proj.pet.board.domain.VisibleScope;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.*;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.scrap.domain.Scrap;
import proj.pet.testutil.E2ETest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

class BoardControllerTest extends E2ETest {

	private final static String BEARER = "Bearer ";
	private Member member1;
	private Member member2;
	private AnimalCategory dog;

	@BeforeEach
	void setup() {
		dog = AnimalCategory.of(Species.DOG);
		em.persist(dog);
	}

	private Member stubMember(String email, String nickname, LocalDateTime now) {
		return Member.of(
				OauthProfile.of(OauthType.FORTY_TWO, email, nickname),
				Country.KOREA,
				Country.Campus.SEOUL,
				nickname,
				"statement",
				MemberRole.USER,
				now);
	}

	private BoardMedia stubBoardMedia(Board board, Integer index) {
		return BoardMedia.of(board, "mediaUrl", index, MediaType.IMAGE);
	}

	private List<BoardMedia> stubMediaList(Board board) {
		return List.of(
				stubBoardMedia(board, 0),
				stubBoardMedia(board, 1),
				stubBoardMedia(board, 2));
	}

	private List<BoardCategoryFilter> stubBoardCategoryFilter(Board board) {
		BoardCategoryFilter boardCategoryFilter = BoardCategoryFilter.of(board, dog);
		return List.of(boardCategoryFilter);
	}

	private Board stubBoard(Member member, LocalDateTime now) {
		Board board = Board.of(member, VisibleScope.PUBLIC, "title", now);
		em.persist(board);
		List<BoardMedia> boardMedia = stubMediaList(board);
		boardMedia.forEach(em::persist);
		board.addMediaList(boardMedia);
		List<BoardCategoryFilter> boardCategoryFilters = stubBoardCategoryFilter(board);
		boardCategoryFilters.forEach(em::persist);
		board.addCategoryFilters(boardCategoryFilters);
		return board;
	}


	@Nested
	@DisplayName("GET /v1/boards")
	class GetBoards {

		private final String PATH = "/v1/boards";

		@Test
		@DisplayName("게시글 목록을 조회한다.")
		void getMainViewBoards() {
			// given
			LocalDateTime now = LocalDateTime.now();
			member1 = stubMember("email1", "nickname1", now);
			member2 = stubMember("email2", "nickname2", now);
			em.persist(member1);
			em.persist(member2);
			Board board1 = stubBoard(member1, now);
			Board board2 = stubBoard(member1, now);
			Board board3 = stubBoard(member1, now);
			Arrays.asList(board1, board2, board3).forEach(em::persist);
			em.persist(Reaction.of(board1, member2, ReactionType.LIKE, now));
			em.persist(Scrap.of(member2, board2, now));


			String token = stubToken(member1, now, 28);
			System.out.println("token = " + token);
			MockHttpServletRequestBuilder req = get(PATH).header(HttpHeaders.AUTHORIZATION, BEARER + token);

			// when
//			mockMvc.perform();


		}
	}
}