package proj.pet.notice.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import proj.pet.exception.DomainException;
import proj.pet.testutil.test.UnitTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.InstanceOfAssertFactories.type;

public class NoticeFormatTest extends UnitTest {

	@DisplayName("NoticeFormat 객체 생성 테스트")
	@Test
	void of() {
		// given
		String format = "Hello, {}!";

		// when
		NoticeFormat noticeFormat = NoticeFormat.of(format);

		// then
		assertThat(noticeFormat).isNotNull();
		assertThat(noticeFormat.getFormat()).isEqualTo(format);
		assertThat(noticeFormat.countPlaceholders()).isEqualTo(1);
	}

	@Nested
	@DisplayName("NoticeFormat을 생성할 때")
	class Of {
		@Test
		@DisplayName("{}을 포함하지 않으면 예외가 발생한다")
		void fail() throws Exception {
			// given
			String format = "Hello, world!";

			// when,then
			assertThatThrownBy(() -> NoticeFormat.of(format))
					.asInstanceOf(type(DomainException.class));
		}

		@DisplayName("{}가 포함되어 있다면 예외가 발생하지 않는다")
		@Test
		void success() {
			//given
			String format = "Hello, {}!";

			//when, then
			assertThat(NoticeFormat.of(format)).isNotNull();
			assertThat(NoticeFormat.of(format).getFormat()).isEqualTo(format);
			assertThat(NoticeFormat.of(format).countPlaceholders()).isEqualTo(1);
		}
	}
}
