package proj.pet.member.domain;

public enum MemberRole {
	NOT_REGISTERED,
	USER,
	ADMIN,
	;

	public static MemberRole from(String role) {
		return MemberRole.valueOf(role.toUpperCase());
	}
}
