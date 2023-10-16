package proj.pet.notice.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.context.ApplicationEventPublisher;
import proj.pet.board.domain.Board;
import proj.pet.exception.DomainException;
import proj.pet.member.domain.Member;
import proj.pet.notice.domain.EntityAdaptor;
import proj.pet.notice.domain.NoticeType;
import proj.pet.testutil.test.UnitTest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.member.TestMember;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class NoticeEventPublisherTest extends UnitTest {
	@Mock
	ApplicationEventPublisher eventPublisher;
	@Mock
	EntityAdaptor entityAdaptor;
	@InjectMocks
	private NoticeEventPublisher noticeEventPublisher;

	@Nested
	@DisplayName("NoticeEvent를 publish 할 때")
	class Publish {

		private final NoticeType noticeType = NoticeType.NEW_FOLLOW;
		private final Member mockMember1 = TestMember.builder().build().asMockEntity(1L);
		private final Member mockMember2 = TestMember.builder().build().asMockEntity(2L);
		private final Board mockBoard1 = TestBoard.builder().build().asMockEntity(1L);
		private final Board mockBoard2 = TestBoard.builder().build().asMockEntity(2L);

		@DisplayName("NoticeType이 기대하는 Parameter를 모두 제공하면 publish가 성공한다.")
		@Test
		void 매개변수_클래스_및_수_일치() {
			//when, then
			noticeEventPublisher.publish(noticeType, 1L, mockMember1);
		}

		@Test
		@DisplayName("NoticeType이 기대하는 Parameter의 수와 일치하지 않으면 예외가 발생한다.")
		void 매개변수_수_불일치() throws Exception {
			//when, then
			assertThatThrownBy(() -> noticeEventPublisher.publish(noticeType, 1L, mockMember1, mockMember2))
					.isInstanceOf(DomainException.class);
		}

		@DisplayName("NoticeType이 기대하는 Parameter로서 entity의 클래스가 일치하지 않으면 예외가 발생한다.")
		@Test
		void 클래스_불일치() {
			//when, then
			assertThatThrownBy(() -> noticeEventPublisher.publish(noticeType, 1L, mockBoard1))
					.isInstanceOf(DomainException.class);
		}

	}
}
