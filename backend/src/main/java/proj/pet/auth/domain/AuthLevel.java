package proj.pet.auth.domain;

import proj.pet.member.domain.MemberRole;

import java.util.Arrays;
import java.util.List;

/**
 * 권한 설정을 위한 열거형 클래스
 */
public enum AuthLevel {


	ALL_AVAILABLE {
		@Override public boolean isMatchWith(MemberRole role) {
			return ALL_ROLES.contains(role);
		}
	},
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

	private static final List<MemberRole> ALL_ROLES = Arrays.asList(MemberRole.values());

	public abstract boolean isMatchWith(MemberRole role);
}
