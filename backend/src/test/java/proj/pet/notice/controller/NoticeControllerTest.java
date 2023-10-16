package proj.pet.notice.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
import proj.pet.member.domain.Member;
import proj.pet.notice.domain.Notice;
import proj.pet.notice.domain.NoticeType;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.member.TestMember;

public class NoticeControllerTest extends E2ETest {

	private final static String BEARER = "Bearer ";
	private PersistHelper ph;

	private Member author;
	private Member member;

	@BeforeEach
	public void setUp() {
		ph = PersistHelper.start(em);
		author = TestMember.asDefaultEntity();
		member = TestMember.asDefaultEntity();
	}

	@Nested
	@DisplayName("GET /v1/notices/me")
	class nested {

		private final String path = "/v1/notices/me";
		private final LocalDateTime now = LocalDateTime.now();

		@Test
		@DisplayName("사용자는 본인의 알림을 조회할 수 있다.")
		void getNotices() throws Exception {
			ph.persist(author, member);
			Board board = TestBoard.builder()
					.member(author)
					.build().asEntity();
			ph.persist(board).flushAndClear();
			BoardMedia boardMedia = TestBoardMedia.asDefaultEntity(board);
			if (board.getMediaList() == null) {
				board.addMediaList(List.of(boardMedia));
			} else {
				board.getMediaList().add(boardMedia);
			}
			ph.persist(boardMedia).flushAndClear();
			ph.persist(
					Notice.of(member.getId(), NoticeType.NEW_FOLLOW,
							"M/" + member.getId() + "/sanan", now),
					Notice.of(member.getId(), NoticeType.NEW_BOARD_COMMENT,
							"B/" + board.getId() + ",M/" + member.getId() + "/sanan", now)
			).flushAndClear();

			String token = stubToken(member, now, 28);
			MockHttpServletRequestBuilder req = get(path)
					.header("Authorization", BEARER + token)
					.param("page", "0").param("size", "10");

			// when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.result").isArray())
					.andExpect(jsonPath("$.result.length()").value(2))
					.andExpectAll(
							jsonPath("$.result[0].type").value("NEW_FOLLOW"),
							jsonPath("$.result[0].parameters[0].type").value("MEMBER"),
							jsonPath("$.result[0].parameters[0].id").value(member.getId()),
							jsonPath("$.result[0].parameters[0].content").value("sanan"),
							jsonPath("$.result[0].thumbnailUrl").value(member.getProfileImageUrl()),
							jsonPath("$.result[0].readAt").doesNotExist(),
							jsonPath("$.result[1].type").value("NEW_BOARD_COMMENT"),
							jsonPath("$.result[1].parameters[0].type").value("BOARD"),
							jsonPath("$.result[1].parameters[0].id").value(board.getId()),
							jsonPath("$.result[1].parameters[0].content").doesNotExist(),
							jsonPath("$.result[1].parameters[1].type").value("MEMBER"),
							jsonPath("$.result[1].parameters[1].id").value(member.getId()),
							jsonPath("$.result[1].parameters[1].content").value("sanan"),
							jsonPath("$.result[1].thumbnailUrl").value(boardMedia.getMediaUrl()),
							jsonPath("$.result[1].readAt").doesNotExist(),
							jsonPath("$.totalLength").value(2)
					);
		}

	}
}