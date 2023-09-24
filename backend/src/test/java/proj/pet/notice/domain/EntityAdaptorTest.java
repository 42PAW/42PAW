package proj.pet.notice.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.follow.domain.Follow;
import proj.pet.member.domain.Member;
import proj.pet.testutil.test.UnitTest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.comment.TestComment;
import proj.pet.testutil.testdouble.follow.TestFollow;
import proj.pet.testutil.testdouble.member.TestMember;
import proj.pet.utils.domain.MemberCompositeKey;

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
					NoticeEntityType.BOARD.getPlaceholder(), board.getId(), member.getId()));
		}

		@Test
		@DisplayName("댓글 ID와 작성자의 닉네임을 포함한다.")
		void comment() throws Exception {
			// given
			Member member = TestMember.builder().build().asMockEntity(1L);
			Board board = TestBoard.builder().member(member).build().asMockEntity(1L);
			Comment comment = TestComment.builder().member(member).board(board).build().asMockEntity(1L);

			// when
			NoticeParameter noticeParameter = entityAdaptor.toNoticeParameter(comment);

			// then
			assertThat(noticeParameter.getParameter()).isEqualTo(String.format(
					NoticeEntityType.COMMENT.getPlaceholder(), comment.getId(), member.getNickname()));
		}

		@Test
		@DisplayName("팔로워의 ID와 닉네임을 포함한다.")
		void follow() throws Exception {
			// given
			Member member = TestMember.builder().build().asMockEntity(1L);
			Member follower = TestMember.builder().build().asMockEntity(2L);
			Follow follow = TestFollow.builder().from(follower).to(member).build().asMockEntity(MemberCompositeKey.of(follower.getId(), member.getId()));

			// when
			NoticeParameter noticeParameter = entityAdaptor.toNoticeParameter(follow);

			// then
			assertThat(noticeParameter.getParameter()).isEqualTo(String.format(
					NoticeEntityType.FOLLOW.getPlaceholder(), follower.getId(), follower.getNickname()));
		}
	}
}
