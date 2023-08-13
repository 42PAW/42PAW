package proj.pet.member.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CountryCampusTest {

	@DisplayName("성공 : 캠퍼스를 기준으로 그 캠퍼스가 속하는 나라를 찾을 수 있다.")
	@Test
	void whereLocates() {
		//given
		Country.Campus campus = Country.Campus.SEOUL;

		//when
		Country country = Country.whereLocates(campus);

		//then
		assertThat(country).isEqualTo(Country.KOREA);
	}

	@DisplayName("성공 : 이름을 기준으로 나라를 찾을 수 있다.")
	@Test
	void from() {
		//given
		String smallLetterCountry = "korea";
		String capitalLetterCountry = "Korea";
		String fullCapitalLetterCountry = "KOREA";

		//when
		Country countryFromSmallLetter = Country.from(smallLetterCountry);
		Country countryFromCapitalLetter = Country.from(capitalLetterCountry);
		Country countryFromFullCapitalLetter = Country.from(fullCapitalLetterCountry);

		//then
		assertThat(countryFromSmallLetter).isEqualTo(Country.KOREA);
		assertThat(countryFromCapitalLetter).isEqualTo(Country.KOREA);
		assertThat(countryFromFullCapitalLetter).isEqualTo(Country.KOREA);
	}


	@DisplayName("성공 : 이름을 기준으로 캠퍼스를 찾을 수 있다.")
	@Test
	void campusFrom() {
		//given
		String smallLetterCampusName = "seoul";
		String capitalLetterCampusName = "Seoul";
		String fullCapitalLetterCampusName = "SEOUL";

		//when
		Country.Campus campusFromSmallLetter = Country.Campus.from(smallLetterCampusName);
		Country.Campus campusFromCapitalLetter = Country.Campus.from(capitalLetterCampusName);
		Country.Campus campusFromFullCapitalLetter = Country.Campus.from(fullCapitalLetterCampusName);

		//then
		assertThat(campusFromSmallLetter).isEqualTo(Country.Campus.SEOUL);
		assertThat(campusFromCapitalLetter).isEqualTo(Country.Campus.SEOUL);
		assertThat(campusFromFullCapitalLetter).isEqualTo(Country.Campus.SEOUL);
	}
}