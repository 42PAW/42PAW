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
import proj.pet.testutil.test.E2ETest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class BoardControllerTest extends E2ETest {

	private final static String BEARER = "Bearer ";
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
		@DisplayName("가입한 사용자가 좋아요, 스크랩 한 게시글 목록을 조회한다.")
		void getMainViewBoards() throws Exception {
			// given
			LocalDateTime now = LocalDateTime.now();
			Member author = stubMember("email1", "nickname1", now);
			Member loginUser = stubMember("email2", "nickname2", now);
			em.persist(author);
			em.persist(loginUser);
			Board board1 = stubBoard(author, now);
			Board board2 = stubBoard(author, now);
			Board board3 = stubBoard(author, now);
			Arrays.asList(board1, board2, board3).forEach(em::persist);
			em.persist(Reaction.of(board1, loginUser, ReactionType.LIKE, now));
			em.persist(Scrap.of(loginUser, board2, now));
			em.flush();
			em.clear();


			String token = stubToken(loginUser, now, 28);
			MockHttpServletRequestBuilder req = get(PATH)
					.header(HttpHeaders.AUTHORIZATION, BEARER + token)
					.param("page", "0")
					.param("size", "10");

			// when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(3))
					.andExpect(jsonPath("result[0].content").value(board1.getContent()))
					.andExpect(jsonPath("result[0].reacted").value(true));


		}
	}
}