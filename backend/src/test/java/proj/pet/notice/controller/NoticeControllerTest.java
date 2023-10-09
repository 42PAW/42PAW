package proj.pet.notice.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.notice.domain.Notice;
import proj.pet.notice.domain.NoticeEntityType;
import proj.pet.notice.domain.NoticeType;
import proj.pet.notice.dto.NoticeParameterDto;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.member.TestMember;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class NoticeControllerTest extends E2ETest {

	private final static String BEARER = "Bearer ";
	private PersistHelper ph;

	private Member author;
	private Member member;
	private Board board;

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
			Board board = ph.persist(author, member)
					.and().persistAndReturn(TestBoard.asDefaultEntity(author));
			ph.persist(
					Notice.of(member.getId(), NoticeType.NEW_FOLLOW, "M_sanan_1", now),
					Notice.of(member.getId(), NoticeType.NEW_BOARD_COMMENT, "B_1,M_sanan_1", now)
			).flushAndClear();

			String token = stubToken(member, now, 28);
			MockHttpServletRequestBuilder req = get(path)
					.header("Authorization", BEARER + token);

			// when
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(jsonPath("$.result").isArray())
					.andExpect(jsonPath("$.result.length()").value(2))
					.andExpectAll(
							jsonPath("$.result[0].type").value("NEW_FOLLOW"),
							jsonPath("$.result[0].parameter").value(new NoticeParameterDto(NoticeEntityType.MEMBER, 1L, "sanan")),
							jsonPath("$.result[1].type").value("NEW_BOARD_COMMENT"),
							jsonPath("$.result[1].parameter").value(new NoticeParameterDto(NoticeEntityType.BOARD, board.getId(), null))
					);
		}

	}
}