package proj.pet.notice;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.comment.dto.CommentCreateRequestDto;
import proj.pet.member.domain.Member;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.member.TestMember;

public class EventPublishTest extends E2ETest {

	private final static String BEARER = "Bearer ";
	private PersistHelper ph;

	@BeforeEach
	public void setUp() {
		ph = PersistHelper.start(em);
	}

	@Nested
	@DisplayName("알림 E2E 테스트")
	class nested {

		private final String path = "/v1/comments";
		private final LocalDateTime now = LocalDateTime.now();

		@Test
		@DisplayName("댓글 알림 테스트")
		void commentNoticeEventTest() throws Exception {
			Member uploader = TestMember.asDefaultEntity();
			Member commenter = TestMember.asDefaultEntity();
			ph.persist(uploader, commenter);

			Board board = TestBoard.builder()
					.member(uploader)
					.build().asEntity();
			ph.persist(board).flushAndClear();

			BoardMedia boardMedia = TestBoardMedia.asDefaultEntity(board);
			if (board.getMediaList() == null) {
				board.addMediaList(List.of(boardMedia));
			} else {
				board.getMediaList().add(boardMedia);
			}
			ph.persist(boardMedia).flushAndClear();

			String commenterToken = stubToken(commenter, now, 1);
			String commentCreateRequestDto = objectMapper.writeValueAsString(
					new CommentCreateRequestDto(board.getId(), "태그 테스트"));
			MockHttpServletRequestBuilder commentRequest = post(path)
					.header("Authorization", BEARER + commenterToken)
					.content(commentCreateRequestDto)
					.contentType("application/json");
			mockMvc.perform(commentRequest)
					.andDo(print())
					.andExpect(status().isOk());

			String uploaderToken = stubToken(uploader, now, 1);
			MockHttpServletRequestBuilder uploaderNoticeRequest = get("/v1/notices/me")
					.header("Authorization", BEARER + uploaderToken)
					.contentType("application/json");
			mockMvc.perform(uploaderNoticeRequest)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.result").isArray())
					.andExpect(jsonPath("$.result.length()").value(1))
					.andExpectAll(
							jsonPath("$.result[0].type").value("NEW_BOARD_COMMENT"),
							jsonPath("$.result[0].parameters[0].type").value("BOARD"),
							jsonPath("$.result[0].parameters[0].id").value(board.getId()),
							jsonPath("$.result[0].parameters[1].type").value("MEMBER"),
							jsonPath("$.result[0].parameters[1].id").value(commenter.getId()),
							jsonPath("$.result[0].parameters[1].content").value(
									commenter.getNickname()));
		}

		@Test
		@DisplayName("댓글 태깅 알림 E2E 테스트")
		void commentTagNoticeEventTest() throws Exception {
			Member uploader = TestMember.asDefaultEntity();
			Member commenter = TestMember.asDefaultEntity();
			Member taggedMember = TestMember.asDefaultEntity();
			ph.persist(uploader, commenter, taggedMember);

			Board board = TestBoard.builder()
					.member(uploader)
					.build().asEntity();
			ph.persist(board).flushAndClear();

			BoardMedia boardMedia = TestBoardMedia.asDefaultEntity(board);
			if (board.getMediaList() == null) {
				board.addMediaList(List.of(boardMedia));
			} else {
				board.getMediaList().add(boardMedia);
			}
			ph.persist(boardMedia).flushAndClear();

			String commenterToken = stubToken(commenter, now, 1);
			String commentCreateRequestDto = objectMapper.writeValueAsString(
					new CommentCreateRequestDto(board.getId(),
							"@" + taggedMember.getNickname() + " & @notFoundMember 태그 테스트"));
			MockHttpServletRequestBuilder commentRequest = post(path)
					.header("Authorization", BEARER + commenterToken)
					.content(commentCreateRequestDto)
					.contentType("application/json");
			mockMvc.perform(commentRequest)
					.andDo(print())
					.andExpect(status().isOk());

			String taggedMemberToken = stubToken(taggedMember, now, 1);
			MockHttpServletRequestBuilder taggedMemberNoticeRequest = get("/v1/notices/me")
					.header("Authorization", BEARER + taggedMemberToken)
					.contentType("application/json");
			mockMvc.perform(taggedMemberNoticeRequest)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.result").isArray())
					.andExpect(jsonPath("$.result.length()").value(1))
					.andExpectAll(
							jsonPath("$.result[0].type").value("NEW_COMMENT_TAG"),
							jsonPath("$.result[0].parameters[0].type").value("BOARD"),
							jsonPath("$.result[0].parameters[0].id").value(board.getId()),
							jsonPath("$.result[0].parameters[1].type").value("MEMBER"),
							jsonPath("$.result[0].parameters[1].id").value(commenter.getId()),
							jsonPath("$.result[0].parameters[1].content").value(
									commenter.getNickname()));
		}
	}
}
