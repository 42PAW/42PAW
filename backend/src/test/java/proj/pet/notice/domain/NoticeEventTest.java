package proj.pet.notice.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import proj.pet.exception.DomainException;
import proj.pet.testutil.test.UnitTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class NoticeEventTest extends UnitTest {
	@Nested
	@DisplayName("NoticeEvent를 생성할 때")
	class nested {
		@Test
		@DisplayName("Format의 PlaceHolder와 Parameter의 수가 일치하지 않으면 예외가 발생한다.")
		void fail() throws Exception {
			// given
			NoticeFormat format = NoticeFormat.of("{}님이 {}님을 팔로우합니다.}");
			NoticeParameter parameter = NoticeParameter.of("{MBR/1/sanan}");

			// when
			assertThatThrownBy(() -> NoticeEvent.of("팔로우 알림", format, List.of(parameter), 1L))
					.isInstanceOf(DomainException.class);
		}

		@DisplayName("Format의 PlaceHolder와 Parameter의 수가 일치하면 예외가 발생하지 않는다.")
		@Test
		void success() {
			// given
			NoticeFormat format = NoticeFormat.of("{}님이 당신을 팔로우합니다.");
			NoticeParameter parameter = NoticeParameter.of("{MBR/1/sanan}");

			// when
			NoticeEvent noticeEvent = NoticeEvent.of("팔로우 알림", format, List.of(parameter), 1L);

			// then
			assertThat(noticeEvent).isNotNull();
		}
	}

	@Nested
	@DisplayName("Notice 엔티티로 변환할 때")
	class ExtractParameters {
		@Test
		@DisplayName("Parameter를 이어서 반환한다.")
		void parameters() throws Exception {
			// given
			NoticeFormat format = NoticeFormat.of("{}님이 {}님을 팔로우합니다.");
			NoticeParameter parameter1 = NoticeParameter.of("{MBR/1/sanan}");
			NoticeParameter parameter2 = NoticeParameter.of("{MBR/2/jpark2}");
			NoticeEvent noticeEvent = NoticeEvent.of("팔로우 알림", format, List.of(parameter1, parameter2), 1L);

			// when
			Notice notice = noticeEvent.toNotice();

			// then
			assertThat(notice.getParameters()).isEqualTo("{MBR/1/sanan},{MBR/2/jpark2}");
		}

	}
}
