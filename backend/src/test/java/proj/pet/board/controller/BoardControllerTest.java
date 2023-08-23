package proj.pet.board.controller;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.board.domain.Board;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.scrap.domain.Scrap;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.category.TestAnimalCategory;
import proj.pet.testutil.testdouble.category.TestBoardCategoryFilter;
import proj.pet.testutil.testdouble.member.TestMember;
import proj.pet.testutil.testdouble.reaction.TestReaction;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static proj.pet.testutil.testdouble.board.TestBoardMedia.DEFAULT_MEDIA_URL;

class BoardControllerTest extends E2ETest {

	/*------------------------------UTIL------------------------------*/
	private final static String BEARER = "Bearer ";
	private PersistHelper persistHelper;

	/*---------------------------TEST-DOUBLE---------------------------*/
	private List<AnimalCategory> categories;

	private Member author;
	private Member loginUser;

	@BeforeEach
	void setup() {
		persistHelper = PersistHelper.start(em);
		categories = persistHelper.persistAndReturn(TestAnimalCategory.getAllSpeciesAsCategories());
		author = TestMember.asDefaultEntity();
		loginUser = TestMember.builder()
				.oauthName("loginUser")
				.build().asEntity();
	}


	/**
	 * req : {@link UserSessionDto}, int page, int size
	 * <br>
	 * res : {@link BoardsPaginationDto}
	 * <br>
	 *
	 * @see BoardInfoDto
	 */
	@Nested
	@DisplayName("GET /v1/boards")
	class GetBoards {

		private final String PATH = "/v1/boards";
		private final LocalDateTime now = LocalDateTime.now();

		@Test
		@DisplayName("가입한 사용자가 좋아요, 스크랩 한 게시글 목록을 조회한다.")
		void getMainViewBoards() throws Exception {
			// given
			persistHelper.persist(author, loginUser);
			Board board1 = TestBoard.builder().member(author)
					.build().asEntity();
			Board board2 = TestBoard.builder().member(author)
					.build().asEntity();
			persistHelper.persist(board1, board2)
					.and().persist(
							TestBoardMedia.createEntitiesOf(
									board1,
									DEFAULT_MEDIA_URL + 0,
									DEFAULT_MEDIA_URL + 1,
									DEFAULT_MEDIA_URL + 2))
					.and().persist(
							TestBoardCategoryFilter.ofMany(
									board1,
									categories.get(0),
									categories.get(1)))
					.and().persist(
							Reaction.of(board1, loginUser, ReactionType.LIKE, now),
							Scrap.of(loginUser, board2, now))
					.flushAndClear();

			String token = stubToken(loginUser, now, 28);
			MockHttpServletRequestBuilder req = get(PATH)
					.header(HttpHeaders.AUTHORIZATION, BEARER + token)
					.param("page", "0")
					.param("size", "10");

			// when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(2))
					.andExpect(jsonPath("result[0].content").value(TestBoard.DEFAULT_CONTENT))
					.andExpect(jsonPath("result[0].memberName").value(TestMember.DEFAULT_NICKNAME))
					.andExpect(jsonPath("result[0].reacted").value(true))
					.andExpect(jsonPath("result[0].scrapped").value(false))
					.andExpect(jsonPath("result[1].scrapped").value(true))
					.andExpect(jsonPath("result[0].categories.size()").value(2))
					.andExpect(jsonPath("result[0].images").value(
							Matchers.hasItems(DEFAULT_MEDIA_URL + 0, DEFAULT_MEDIA_URL + 1, DEFAULT_MEDIA_URL + 2)));
		}

		@DisplayName("가입하지 않은 상태의 사용자도 게시글 목록을 조회할 수 있다.")
		@Test
		void getMainViewBoards_NO_TOKEN() throws Exception {
			//given
			persistHelper.persist(author);
			Board board1 = TestBoard.builder().member(author)
					.build().asEntity();
			Board board2 = TestBoard.builder().member(author)
					.build().asEntity();
			persistHelper.persist(board1, board2);

			MockHttpServletRequestBuilder req = get(PATH)
					.param("page", "0")
					.param("size", "10");

			//when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(2))
					.andExpect(jsonPath("result[0].content").value(TestBoard.DEFAULT_CONTENT))
					.andExpect(jsonPath("result[0].memberName").value(TestMember.DEFAULT_NICKNAME))
					.andExpect(jsonPath("result[0].reacted").value(false))
					.andExpect(jsonPath("result[0].scrapped").value(false))
					.andExpect(jsonPath("result[1].scrapped").value(false));
		}
	}

	@Nested
	@DisplayName("GET /v1/boards/hot")
	class GetHotBoards {
		private final String PATH = "/v1/boards/hot";
		private final LocalDateTime now = LocalDateTime.now();

		private final Member randomMember1 = TestMember.builder().build().asEntity();
		private final Member randomMember2 = TestMember.builder().build().asEntity();
		private final Member randomMember3 = TestMember.builder().build().asEntity();

		@Test
		@DisplayName("사용자는 인기 게시글을 조회할 수 있다.")
		void getHotBoards() throws Exception {
			// given
			persistHelper.persist(author, loginUser, randomMember1, randomMember2, randomMember3);
			String notHotContent = "this is not hot";
			Board board1 = TestBoard.builder().member(author).build().asEntity();
			Board board2 = TestBoard.builder().member(author).build().asEntity();
			Board board3 = TestBoard.builder().member(author).build().asEntity();
			Board board4 = TestBoard.builder().member(author).build().asEntity();
			Board board5 = TestBoard.builder().member(author)
					.content(notHotContent)
					.build().asEntity();
			Board board6 = TestBoard.builder().member(author).build().asEntity();
			persistHelper.persist(board1, board2, board3, board4, board5, board6)
					.and().persist(
							TestReaction.ofMany(board1, ReactionType.LIKE, now,
									randomMember1, randomMember2, randomMember3),
							TestReaction.ofMany(board2, ReactionType.LIKE, now,
									randomMember1, randomMember2, randomMember3),
							TestReaction.ofMany(board3, ReactionType.LIKE, now,
									randomMember1, randomMember2, randomMember3),
							TestReaction.ofMany(board4, ReactionType.LIKE, now,
									randomMember1, randomMember2, randomMember3),
							TestReaction.ofMany(board6, ReactionType.LIKE, now,
									randomMember1, randomMember2, randomMember3))
					.flushAndClear();

			String token = stubToken(loginUser, now, 28);
			MockHttpServletRequestBuilder req = get(PATH)
					.header(HttpHeaders.AUTHORIZATION, BEARER + token)
					.param("page", "0")
					.param("size", "5");

			//then
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(5))
					.andExpect(jsonPath("result[*].content").value(Matchers.not(Matchers.hasItem(notHotContent))))
					.andExpect(jsonPath("result[0].content").value(TestBoard.DEFAULT_CONTENT))
					.andExpect(jsonPath("result[0].memberName").value(TestMember.DEFAULT_NICKNAME))
			;

		}

	}
}