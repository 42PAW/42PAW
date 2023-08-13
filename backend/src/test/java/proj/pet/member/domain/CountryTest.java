package proj.pet.member.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CountryTest {

	@DisplayName("성공: 캠퍼스를 기준으로 그 캠퍼스가 속하는 나라를 찾을 수 있다.")
	@Test
	void whereLocates1() {
		//given
		Country.Campus campus = Country.Campus.SEOUL;

		//when
		Country country = Country.whereLocates(campus);

		//then
		Assertions.assertThat(country).isEqualTo(Country.KOREA);
	}

	@DisplayName("실패: 캠퍼스를 기준으로 나라를 찾을 때, 없는 캠퍼스라면 오류를 반환한다.")
	@Test
	void whereLocates2() {
		//given
		Country.Campus campus = Country.Campus.SEOUL;

		//when
		Country country = Country.whereLocates(campus);

		//then
		Assertions.assertThat(country).isEqualTo(Country.KOREA);
	}

}