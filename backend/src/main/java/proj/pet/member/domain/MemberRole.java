package proj.pet.member.domain;

public enum MemberRole {
	USER,
	ADMIN,
	;

	public static MemberRole from(String role) {
		return MemberRole.valueOf(role.toUpperCase());
	}
}
