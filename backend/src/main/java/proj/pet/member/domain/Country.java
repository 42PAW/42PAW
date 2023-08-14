package proj.pet.member.domain;

import static proj.pet.exception.ExceptionStatus.INCORRECT_ARGUMENT;

import java.util.EnumSet;
import java.util.List;
import lombok.Getter;

/**
 * 42가 있는 국가와 캠퍼스 정보를 담고 있는 Enum
 */
@Getter
public enum Country {

	ARMENIA(Language.ENGLISH, Campus.YEREVAN),
	AUSTRALIA(Language.ENGLISH, Campus.ADELAIDE),
	AUSTRIA(Language.GERMAN, Campus.VIENNA),
	BELGIUM(Language.ENGLISH, Campus.NINE_TEEN),
	BRAZIL(Language.PORTUGUESE, Campus.RIO_DE_JANEIRO, Campus.SAO_PAULO),
	CANADA(Language.ENGLISH, Campus.QUEBEC),
	CZECH(Language.ENGLISH, Campus.PRAGUE),
	ETC(Language.ENGLISH),
	FINLAND(Language.ENGLISH, Campus.HELSINKI),
	FRANCE(Language.FRENCH, Campus.LE_HAVRE, Campus.PERPIGNAN, Campus.MULHOUSE, Campus.NICE,
			Campus.LYON, Campus.PARIS, Campus.ANGOULEME),
	GERMANY(Language.GERMAN, Campus.BERLIN, Campus.WOLFSBURG, Campus.HELIBRONN),
	ITALY(Language.ITALIAN, Campus.FLORENCE, Campus.ROME),
	JAPAN(Language.JAPANESE, Campus.TOKYO),
	KOREA(Language.KOREAN, Campus.GYEONGSAN, Campus.SEOUL),
	LUXEMBOURG(Language.ENGLISH, Campus.LOUXEMBOURG),
	MALAYSIA(Language.ENGLISH, Campus.KUALA_LUMPUR),
	MOLDOVA(Language.ENGLISH, Campus.CHISINAU),
	MOROCCO(Language.ENGLISH, Campus.TETOUAN, Campus.BENGUERIR, Campus.KHOURIBGA),
	NETHERLANDS(Language.ENGLISH, Campus.AMSTERDAM),
	PORTUGAL(Language.PORTUGUESE, Campus.PORTO, Campus.LISBOA),
	ROMANIA(Language.ENGLISH, Campus.CLUJ, Campus.BUCHAREST),
	RUSSIA(Language.ENGLISH, Campus.KAZAN, Campus.MOSCOW),
	SINGAPORE(Language.ENGLISH, Campus.SINGAPORE),
	SOUTH_AFRICA(Language.ENGLISH, Campus.JOHANNESBURG, Campus.CAPE_TOWN),
	SPAIN(Language.SPANISH, Campus.BARCELONA, Campus.URDULIZ, Campus.MALAGA, Campus.MADRID),
	SWITZERLAND(Language.ENGLISH, Campus.LAUSANNE),
	THAILAND(Language.ENGLISH, Campus.BANGKOK),
	TURKEY(Language.ENGLISH, Campus.KOCAELI, Campus.ISTANBUL),
	UAE(Language.ENGLISH, Campus.ABU_DHABI),
	UK(Language.ENGLISH, Campus.LONDON),
	UKRAINE(Language.ENGLISH, Campus.KYIV),
	USA(Language.ENGLISH, Campus.FREMONT),
	;

	/**
	 * defaultLanguage - 해당 국가에 설정되는 기본 {@link Language} campuses - 해당 국가에 있는 캠퍼스 List
	 */
	private static final EnumSet<Country> countries = EnumSet.allOf(Country.class);
	private final Language defaultLanguage;
	private final List<Campus> campuses;

	Country(Language defaultLanguage, Campus... campuses) {
		this.defaultLanguage = defaultLanguage;
		this.campuses = List.of(campuses);
	}

	/**
	 * @param country - 국가명
	 * @return 국가명에 해당하는 {@link Country}
	 */
	public static Country from(String country) {
		return Country.valueOf(country.toUpperCase());
	}

	/**
	 * @param campus - 캠퍼스
	 * @return 캠퍼스가 위치한 {@link Country}
	 */
	public static Country whereLocates(Campus campus) {
		return countries.stream()
				.filter(country -> country.campuses.contains(campus))
				.findFirst()
				.orElseThrow(INCORRECT_ARGUMENT::asDomainException);
	}

	/**
	 * 42의 캠퍼스에 대한 정보
	 */
	@Getter
	public enum Campus {
		GYEONGSAN("Gyeongsan", "42gyeongsan.kr"),
		SEOUL("Seoul", "42seoul.kr"),
		SINGAPORE("Singapore", "42singpapore.sg"),
		LE_HAVRE("Le Havre", "42lehavre.fr"),
		PERPIGNAN("Perpignan", "42perpignan.fr"),
		LOUXEMBOURG("Luxembourg", "42luxembourg.lu"),
		PORTO("Porto", "42porto.com"),
		LONDON("London", "42london.com"),
		PRAGUE("Prague", "42prague.com"),
		TETOUAN("Tétouan", "1337.ma"),
		VIENNA("Vienna", "42vienna.com"),
		FLORENCE("Florence", "42firenze.it"),
		BERLIN("Berlin", "42berlin.de"),
		KOCAELI("Kocaeli", "42kocaeli.com.tr"),
		ISTANBUL("Istanbul", "42istanbul.com.tr"),
		MULHOUSE("Mulhouse", "42mulhouse.fr"),
		LAUSANNE("Lausanne", "42lausanne.ch"),
		BARCELONA("Barcelona", "42barcelona.com"),
		WOLFSBURG("Wolfsburg", "42wolfsburg.de"),
		ABU_DHABI("Abu Dhabi", "42abudhabi.ae"),
		FT_NETWORK("42Network", "42network.org"), // France staff로 추정
		NICE("Nice", "42nice.fr"),
		URDULIZ("Urduliz", "42urduliz.com"),
		LYON("Lyon", "42lyon.fr"),
		KYIV("Kyiv", "unit.ua"),
		FREMONT("Fremont", "42.us.org"),
		JOHANNESBURG("Johannesburg", "wethinkcode.co.za"),
		CLUJ("Cluj", ""),
		PARIS("Paris", "42.fr"),
		HELIBRONN("Heilbronn", "42heilbronn.de"),
		LISBOA("Lisboa", "42lisboa.com"),
		MALAGA("Malaga", "42malaga.com"),
		ADELAIDE("Adelaide", "42adel.org.au"),
		KUALA_LUMPUR("Kuala Lumpur", "42kl.edu.my"),
		BANGKOK("Bangkok", "42bangkok.com"),
		YEREVAN("Yerevan", "42yerevan.am"),
		ANGOULEME("Angoulême", "42angouleme.fr"),
		ROME("Rome", "42roma.it"),
		RIO_DE_JANEIRO("Rio de Janeiro", "42.rio"),
		TOKYO("Tokyo", "42tokyo.jp"),
		QUEBEC("Quebec", "42quebec.com"),
		KAZAN("Kazan", "21-school.ru"),
		MADRID("Madrid", "42madrid.com"),
		BENGUERIR("Benguerir", "1337.ma"),
		SAO_PAULO("São-Paulo", "42sp.org.br"),
		MOSCOW("Moscow", "21-school.ru"),
		KHOURIBGA("Khouribga", "1337.ma"),
		CAPE_TOWN("Cape-Town", "wethinkcode.co.za"),
		AMSTERDAM("Amsterdam", "codam.nl"),
		HELSINKI("Helsinki", "hive.fi"),
		NINE_TEEN("19", "s19.be"), // BELGIUM - BRUSSELS
		BUCHAREST("Bucharest", ""),
		CHISINAU("Chisinau", ""),
		;

		/**
		 * originalName - 42 API에서 사용하는 캠퍼스 이름
		 * <p>
		 * emailDomain - 각 캠퍼스에서 사용하는 42 이메일 확장자
		 */
		private static final EnumSet<Campus> campuses = EnumSet.allOf(Campus.class);
		private final String originalName;
		private final String emailDomain;

		Campus(String originalName, String emailDomain) {
			this.originalName = originalName;
			this.emailDomain = emailDomain;
		}

		/**
		 * 캠퍼스 이름으로 캠퍼스 Enum을 반환합니다.
		 *
		 * @param campusName 42 API 기준의 캠퍼스 이름 또는 Enum의 이름
		 * @return 캠퍼스 Enum
		 */
		public static Campus from(String campusName) {
			return campuses.stream()
					.filter(campus -> campus.getOriginalName().equals(campusName)
							|| campus.name().equals(campusName.toUpperCase()))
					.findFirst()
					.orElseThrow(INCORRECT_ARGUMENT::asDomainException);
		}
	}
}
