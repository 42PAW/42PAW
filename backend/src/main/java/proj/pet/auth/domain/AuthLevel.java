package proj.pet.auth.domain;

import proj.pet.member.domain.MemberRole;

/**
 * 권한 설정을 위한 열거형 클래스
 */
public enum AuthLevel {
	USER_ONLY {
		@Override public boolean isMatchWith(MemberRole role) {
			return role.equals(MemberRole.USER);
		}
	},
	ADMIN_ONLY {
		@Override public boolean isMatchWith(MemberRole role) {
			return role.equals(MemberRole.ADMIN);
		}
	},
	USER_OR_ADMIN {
		@Override public boolean isMatchWith(MemberRole role) {
			return role.equals(MemberRole.USER) || role.equals(MemberRole.ADMIN);
		}
	},
	;

	public abstract boolean isMatchWith(MemberRole role);
}
