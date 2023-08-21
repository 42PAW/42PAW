package proj.pet.board.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.exception.DomainException;
import proj.pet.testutil.UnitTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

class MediaTypeTest extends UnitTest {

	@DisplayName("MultipartFile을 기반으로 MediaType을 반환한다.")
	@Test
	void from() {
		MultipartFile mockData = mock(MultipartFile.class);

		given(mockData.getContentType()).willReturn(null);
		Assertions.assertThatThrownBy(() -> MediaType.from(mockData)).isInstanceOf(DomainException.class);

		given(mockData.getContentType()).willReturn("image/png");
		assertThat(MediaType.from(mockData)).isEqualTo(MediaType.IMAGE);

		given(mockData.getContentType()).willReturn("video/mp4");
		assertThat(MediaType.from(mockData)).isEqualTo(MediaType.VIDEO);

		given(mockData.getContentType()).willReturn("SOMETHING_OTHER");
		Assertions.assertThatThrownBy(() -> MediaType.from(mockData)).isInstanceOf(DomainException.class);
	}
}