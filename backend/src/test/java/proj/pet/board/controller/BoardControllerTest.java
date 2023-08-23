package proj.pet.board.controller;

import org.hamcrest.Matchers;
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
import proj.pet.member.domain.Member;
import proj.pet.member.domain.OauthProfile;
import proj.pet.member.domain.OauthType;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.scrap.domain.Scrap;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.member.TestMember;

import java.time.LocalDateTime;
import java.util.Arrays;
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
		categories = Arrays.stream(Species.values()).map(AnimalCategory::of).toList();
		persistHelper.persist(categories).flushAndClear();
		author = TestMember.builder()
				.oauthProfile(OauthProfile.of(OauthType.FORTY_TWO, "email1", "nickname1"))
				.build().asEntity();
		loginUser = TestMember.builder()
				.oauthProfile(OauthProfile.of(OauthType.FORTY_TWO, "email2", "nickname2"))
				.build().asEntity();
	}

	private Board stubBoard(Member member, LocalDateTime now) {
		Board board =
				persistHelper.persistAndReturn(Board.of(member, VisibleScope.PUBLIC, "title", now));
		List<BoardMedia> boardMedia = persistHelper.persistAndReturn(
				BoardMedia.of(board, "mediaUrl1", 0, MediaType.IMAGE),
				BoardMedia.of(board, "mediaUrl2", 1, MediaType.IMAGE),
				BoardMedia.of(board, "mediaUrl3", 2, MediaType.VIDEO));
		board.addMediaList(boardMedia);
		List<BoardCategoryFilter> boardCategoryFilters = persistHelper.persistAndReturn(
				List.of(
						BoardCategoryFilter.of(board, categories.get(0))
				));
		board.addCategoryFilters(boardCategoryFilters);
		return board;
	}


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
			persistHelper.persist(board1, board2);
			List<BoardMedia> boardMedia = TestBoardMedia.builder()
					.board(board1)
					.build().asEntitiesOfCount(3);
			board1.addMediaList(boardMedia);
			persistHelper
					.persist(
							board1, board2,
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
//					.andExpect(jsonPath("result[0].categories.[0]").value(categories.get(0).getCategoryName()))
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
			Board board1 = TestBoard.builder().member(author).build().asEntity();
			Board board2 = TestBoard.builder().member(author).build().asEntity();
			Board board3 = TestBoard.builder().member(author).build().asEntity();
			Board board4 = TestBoard.builder().member(author).build().asEntity();
			Board board5 = TestBoard.builder().member(author)
					.content("this is not hot")
					.build().asEntity();
			Board board6 = TestBoard.builder().member(author).build().asEntity();
			persistHelper.persist(board1, board2, board3, board4, board5, board6)
					.and().persist(
							Reaction.of(board1, randomMember1, ReactionType.LIKE, now),
							Reaction.of(board1, randomMember2, ReactionType.LIKE, now),
							Reaction.of(board1, randomMember3, ReactionType.LIKE, now),
							Reaction.of(board2, randomMember1, ReactionType.LIKE, now),
							Reaction.of(board2, randomMember2, ReactionType.LIKE, now),
							Reaction.of(board2, randomMember3, ReactionType.LIKE, now),
							Reaction.of(board3, randomMember1, ReactionType.LIKE, now),
							Reaction.of(board3, randomMember2, ReactionType.LIKE, now),
							Reaction.of(board3, randomMember3, ReactionType.LIKE, now),
							Reaction.of(board4, randomMember1, ReactionType.LIKE, now),
							Reaction.of(board4, randomMember2, ReactionType.LIKE, now),
							Reaction.of(board4, randomMember3, ReactionType.LIKE, now),
							Reaction.of(board6, randomMember1, ReactionType.LIKE, now),
							Reaction.of(board6, randomMember2, ReactionType.LIKE, now),
							Reaction.of(board6, randomMember3, ReactionType.LIKE, now))
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
					.andExpect(jsonPath("result[*].content").value(Matchers.not(Matchers.hasItem("this is not hot"))))
					.andExpect(jsonPath("result[0].content").value(TestBoard.DEFAULT_CONTENT))
					.andExpect(jsonPath("result[0].memberName").value(TestMember.DEFAULT_NICKNAME))
			;

		}

	}
}