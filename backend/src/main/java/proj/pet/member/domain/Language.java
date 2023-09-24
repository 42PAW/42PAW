package proj.pet.member.domain;

public enum Language {
	KOREAN,
	ENGLISH,
	JAPANESE,
	SPANISH,
	GERMAN,
	FRENCH,
	ITALIAN,
	PORTUGUESE,
	;

	public static Language from(String language) {
		return Language.valueOf(language.toUpperCase());
	}
}
