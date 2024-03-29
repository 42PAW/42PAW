package proj.pet.board.controller;

import com.amazonaws.services.s3.AmazonS3;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMediaManager;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.category.domain.Species;
import proj.pet.follow.domain.Follow;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.scrap.domain.Scrap;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.category.TestBoardCategoryFilter;
import proj.pet.testutil.testdouble.category.TestMemberCategoryFilter;
import proj.pet.testutil.testdouble.member.TestMember;
import proj.pet.testutil.testdouble.reaction.TestReaction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static proj.pet.testutil.testdouble.board.TestBoardMedia.DEFAULT_MEDIA_URL;

class BoardControllerTest extends E2ETest {

	/*------------------------------UTIL------------------------------*/
	private final static String BEARER = "Bearer ";
	private final List<Species> categories = List.of(Species.values());
	private PersistHelper persistHelper;
	/*---------------------------TEST-DOUBLE---------------------------*/
	@MockBean
	private AmazonS3 amazonS3;
	@MockBean
	private BoardMediaManager boardMediaManager;
	private Member author;
	private Member loginUser;

	@BeforeEach
	void setup() {
		persistHelper = PersistHelper.start(em);
		author = TestMember.asDefaultEntity();
		loginUser = TestMember.asDefaultEntity();
	}

	private String randomString() {
		return UUID.randomUUID().toString();
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

			persistHelper.persist(author, loginUser)
					.and().persist(TestMemberCategoryFilter.ofMany(loginUser, categories));
			Board board1 = TestBoard.builder().member(author)
					.build().asEntity();
			Board board2 = TestBoard.builder().member(author)
					.build().asEntity();
			persistHelper.persist(board1, board2)
					.and().persist(
							TestBoardMedia.ofMany(
									board1,
									DEFAULT_MEDIA_URL + 0,
									DEFAULT_MEDIA_URL + 1,
									DEFAULT_MEDIA_URL + 2))
					.and().persist(
							TestBoardCategoryFilter.ofMany(
									board1,
									categories.get(0),
									categories.get(1)),
							TestBoardCategoryFilter.ofMany(
									board2,
									categories.get(0)))
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
					.andExpect(jsonPath("result[0].content").value(board1.getContent()))
					.andExpect(jsonPath("result[0].memberName").value(author.getNickname()))
					.andExpect(jsonPath("result[0].reacted").value(true))
					.andExpect(jsonPath("result[0].scrapped").value(false))
					.andExpect(jsonPath("result[1].scrapped").value(true))
					.andExpect(jsonPath("result[0].categories.size()").value(2))
					.andExpect(jsonPath("result[0].images").value(
							Matchers.hasItems(DEFAULT_MEDIA_URL + 0, DEFAULT_MEDIA_URL + 1,
									DEFAULT_MEDIA_URL + 2)));
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
			persistHelper.persist(board1, board2)
					.and().persist(
							TestBoardCategoryFilter.ofMany(
									board1,
									categories.get(0),
									categories.get(1)),
							TestBoardCategoryFilter.ofMany(
									board2,
									categories.get(0)))
					.flushAndClear();

			MockHttpServletRequestBuilder req = get(PATH)
					.param("page", "0")
					.param("size", "10");

			//when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(2))
					.andExpect(jsonPath("result[0].content").value(board1.getContent()))
					.andExpect(jsonPath("result[0].memberName").value(author.getNickname()))
					.andExpect(jsonPath("result[0].reacted").value(false))
					.andExpect(jsonPath("result[0].scrapped").value(false))
					.andExpect(jsonPath("result[1].scrapped").value(false));
		}
	}

	/**
	 * req : {@link UserSessionDto}, int page, int size
	 * <br>
	 * res : {@link BoardsPaginationDto}
	 */
	@Nested
	@DisplayName("GET /v1/boards/hot")
	class GetHotBoards {

		private final String PATH = "/v1/boards/hot";
		private final LocalDateTime now = LocalDateTime.now();
		private final Member randomMember1 = TestMember.asDefaultEntity();
		private final Member randomMember2 = TestMember.asDefaultEntity();
		private final Member randomMember3 = TestMember.asDefaultEntity();

		@Test
		@DisplayName("사용자는 인기 게시글을 조회할 수 있다. 좋아요 순, 그리고 최신 순으로 정렬된다.")
		void getHotBoards() throws Exception {
			// given
			persistHelper.persist(author, loginUser, randomMember1, randomMember2, randomMember3)
					.and().persist(TestMemberCategoryFilter.ofMany(loginUser, categories));
			String notHotContent = "this is not hot";
			Board board1 = TestBoard.asDefaultEntity(author);
			Board board2 = TestBoard.asDefaultEntity(author);
			Board board3 = TestBoard.builder().member(author)
					.createdAt(now.plusHours(1))
					.build().asEntity();
			Board board4 = TestBoard.builder().member(author)
					.createdAt(now.plusHours(2))
					.build().asEntity();
			Board board5 = TestBoard.builder().member(author)
					.createdAt(now.plusHours(3))
					.build().asEntity();
			Board notHotBoard = TestBoard.builder().member(author)
					.content(notHotContent)
					.build().asEntity();
			persistHelper.persist(board1, board2, board3, board4, notHotBoard, board5)
					.and().persist(
							TestBoardCategoryFilter.ofMany(board1, categories.get(0)),
							TestBoardCategoryFilter.ofMany(board2, categories.get(0)),
							TestBoardCategoryFilter.ofMany(board3, categories.get(0)),
							TestBoardCategoryFilter.ofMany(board4, categories.get(0)),
							TestBoardCategoryFilter.ofMany(board5, categories.get(0)),
							TestBoardCategoryFilter.ofMany(notHotBoard, categories.get(0)))
					.and().persist(
							TestReaction.ofMany(board1, ReactionType.LIKE, now,
									randomMember1, randomMember2, randomMember3),
							TestReaction.ofMany(board2, ReactionType.LIKE, now,
									randomMember1, randomMember2),
							TestReaction.ofMany(board3, ReactionType.LIKE, now,
									randomMember1),
							TestReaction.ofMany(board4, ReactionType.LIKE, now,
									randomMember1),
							TestReaction.ofMany(board5, ReactionType.LIKE, now,
									randomMember1))
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
					.andExpect(jsonPath("totalLength").value(3))
					.andExpect(jsonPath("result.[*].boardId").value(Matchers.contains(
							board5.getId().intValue(),
							board4.getId().intValue(),
							board3.getId().intValue())))
					.andExpect(jsonPath("result.[*].content").value(
							Matchers.not(Matchers.hasItem(notHotContent))))
					.andExpect(jsonPath("result.[0].content").value(board1.getContent()))
					.andExpect(
							jsonPath("result.[0].memberName").value(author.getNickname()));
		}
	}

	@Nested
	@DisplayName("GET /v1/boards/members/{memberId}")
	class GetMemberBoards {

		private final String PATH = "/v1/boards/members/";
		private final LocalDateTime now = LocalDateTime.now();
		private final Member loginUser = TestMember.asDefaultEntity();
		private final Member specifiedMember = TestMember.asDefaultEntity();
		private final Member randomMember1 = TestMember.asDefaultEntity();
		private final Member randomMember2 = TestMember.asDefaultEntity();

		@Test
		@DisplayName("특정 멤버의 게시글 목록을 조회할 수 있다.")
		void getMemberBoards() throws Exception {
			persistHelper.persist(loginUser, randomMember1, randomMember2, specifiedMember)
					.and().persist(
							TestBoard.builder()
									.member(randomMember1)
									.build().asEntity(),
							TestBoard.builder()
									.member(randomMember2)
									.build().asEntity(),
							TestBoard.builder()
									.member(specifiedMember)
									.content("안녕하세요")
									.build().asEntity(),
							TestBoard.builder()
									.member(specifiedMember)
									.content("반갑습니다")
									.build().asEntity())
					.flushAndClear();

			String token = stubToken(loginUser, now, 28);
			MockHttpServletRequestBuilder req = get(PATH + specifiedMember.getId())
					.header(HttpHeaders.AUTHORIZATION, BEARER + token)
					.param("page", "0")
					.param("size", "10");

			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(2))
					.andExpect(jsonPath("result.[*].content").value(
							Matchers.contains("안녕하세요", "반갑습니다")));
		}
	}

	@Nested
	@DisplayName("GET /v1/boards/followings")
	class GetFollowingsBoards {

		private final String PATH = "/v1/boards/followings";
		private final LocalDateTime now = LocalDateTime.now();
		private final Member loginUser = TestMember.asDefaultEntity();
		private final Member followingMember1 = TestMember.asDefaultEntity();
		private final Member followingMember2 = TestMember.asDefaultEntity();
		private final Member randomMember2 = TestMember.asDefaultEntity();

		@Test
		@DisplayName("팔로잉한 멤버의 게시글 목록을 조회할 수 있다.")
		void getFollowingBoards() throws Exception {
			persistHelper.persist(loginUser, followingMember1, followingMember2, randomMember2)
					.and().persist(
							Follow.of(loginUser, followingMember1, now),
							Follow.of(loginUser, followingMember2, now))
					.and().persist(
							TestBoard.builder()
									.member(followingMember1)
									.build().asEntity(),
							TestBoard.builder()
									.member(followingMember2)
									.build().asEntity(),
							TestBoard.builder()
									.member(randomMember2)
									.build().asEntity())
					.flushAndClear();

			String token = stubToken(loginUser, now, 28);
			MockHttpServletRequestBuilder req = get(PATH)
					.header(HttpHeaders.AUTHORIZATION, BEARER + token)
					.param("page", "0")
					.param("size", "10");

			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("totalLength").value(2))
					.andExpect(jsonPath("result.[*].memberName").value(
							Matchers.contains(followingMember1.getNickname(),
									followingMember2.getNickname())));
		}
	}

	@Nested
	@DisplayName("POST /v1/boards")
	class CreateBoards {

		@BeforeEach
		void mockBoardImageManager() {
			given(boardMediaManager.uploadMedia(any(), any())).willReturn(randomString());
		}

		@Test
		@DisplayName("로그인한 사용자는 이미지를 업로드하고, 게시글을 생성할 수 있다.")
		void createBoards() throws Exception {
			persistHelper.persist(author, loginUser)
					.flushAndClear();

			String token = stubToken(loginUser, LocalDateTime.now(), 28);

			BoardCreateRequestDto reqDto = BoardCreateRequestDto.builder()
					.content("content")
					.categoryList(categories.subList(0, 1))
					.mediaUrlList(List.of("mediaUrl1", "mediaUrl2", "mediaUrl3"))
					.build();
			MockHttpServletRequestBuilder req =
					post("/v1/boards")
							.content(objectMapper.writeValueAsString(reqDto))
							.header(HttpHeaders.AUTHORIZATION, BEARER + token)
							.contentType(MediaType.APPLICATION_JSON);

			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(e -> {
						Board board = em.createQuery("select b from Board b", Board.class)
								.getSingleResult();
						assertThat(board.getMember()).isEqualTo(loginUser);
						assertThat(board.getContent()).isEqualTo("content");
						assertThat(board.getMediaList()).hasSize(3);
						assertThat(board.getCategoryFilters()).hasSize(1);
					});
		}
	}

	@Nested
	@DisplayName("DELETE /v1/boards/{boardId}")
	class DeleteBoard {

		@Test
		@DisplayName("로그인한 사용자는 자신의 게시글을 삭제할 수 있다.")
		void deleteBoard() throws Exception {
			//given
			Board board = persistHelper.persist(author)
					.and().persistAndReturn(TestBoard.asDefaultEntity(author));

			String token = stubToken(author, LocalDateTime.now(), 28);
			MockHttpServletRequestBuilder req = delete("/v1/boards/" + board.getId())
					.header(HttpHeaders.AUTHORIZATION, BEARER + token);

			//when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(e -> {
						Board deletedBoard = em.find(Board.class, board.getId());
						assertThat(deletedBoard.getDeletedAt()).isNotNull();
					});
		}
	}
}