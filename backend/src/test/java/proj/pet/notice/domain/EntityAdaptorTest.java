package proj.pet.notice.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.testutil.test.UnitTest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.member.TestMember;

import static org.assertj.core.api.Assertions.assertThat;

public class EntityAdaptorTest extends UnitTest {

	private final EntityAdaptor entityAdaptor = new EntityAdaptor();

	@Nested
	@DisplayName("엔티티를 NoticeParameter로 변경할 때")
	class ToNoticeParameter {
		@Test
		@DisplayName("멤버의 ID와 닉네임을 포함한다.")
		void member() throws Exception {
			// given
			Member member = TestMember.builder().build().asMockEntity(1L);

			// when
			NoticeParameter noticeParameter = entityAdaptor.toNoticeParameter(member);

			// then
			assertThat(noticeParameter.getParameter()).isEqualTo(String.format(
					NoticeEntityType.MEMBER.getPlaceholder(), member.getId(), member.getNickname()));
		}

		@Test
		@DisplayName("게시글 ID와 작성자의 닉네임을 포함한다.")
		void board() throws Exception {
			// given
			Member member = TestMember.builder().build().asMockEntity(1L);
			Board board = TestBoard.builder().member(member).build().asMockEntity(1L);

			// when
			NoticeParameter noticeParameter = entityAdaptor.toNoticeParameter(board);

			// then
			assertThat(noticeParameter.getParameter()).isEqualTo(String.format(
					NoticeEntityType.BOARD.getPlaceholder(), board.getId()));
		}
	}
}
