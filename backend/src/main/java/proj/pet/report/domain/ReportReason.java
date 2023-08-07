package proj.pet.report.domain;

import lombok.Getter;

@Getter
public enum ReportReason {
	WRONG_ANIMAL_CATEGORY("WRONG_ANIMAL_CATEGORY"),
	INSULTS("INSULTS"),
	AD_SPAM("AD_SPAM"),
	INAPPROPRIATE_NICKNAME("INAPPROPRIATE_NICKNAME"),
	SEXUAL_VIOLENCE("SEXUAL_VIOLENCE"),
	IRRELEVANT("IRRELEVANT"),
	ETC("ETC");

	private final String reason;

	ReportReason(String wrongAnimalCategory) {
		this.reason = wrongAnimalCategory;
	}
}
