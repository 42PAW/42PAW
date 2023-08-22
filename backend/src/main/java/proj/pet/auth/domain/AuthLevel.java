package proj.pet.auth.domain;

import java.util.Arrays;
import java.util.List;
import proj.pet.member.domain.MemberRole;

/**
 * 권한 설정을 위한 열거형 클래스
 */
public enum AuthLevel {


	/**
	 * 토큰이 없는 사용자도 사용할 수 있도록 하는 레벨입니다.
	 */
	ANYONE {
		@Override
		public boolean isMatchWith(MemberRole role) {
			return true;
		}
	},
	/**
	 * 토큰에 대한 인증은 필요하지만, 가입은 하지 않은 상태의 유저 또한 사용할 수 있도록 하는 레벨입니다.
	 */
	ANY_TOKEN {
		@Override
		public boolean isMatchWith(MemberRole role) {
			return ALL_ROLES.contains(role);
		}
	},
	USER_ONLY {
		@Override
		public boolean isMatchWith(MemberRole role) {
			return role.equals(MemberRole.USER);
		}
	},
	ADMIN_ONLY {
		@Override
		public boolean isMatchWith(MemberRole role) {
			return role.equals(MemberRole.ADMIN);
		}
	},
	USER_OR_ADMIN {
		@Override
		public boolean isMatchWith(MemberRole role) {
			return role.equals(MemberRole.USER) || role.equals(MemberRole.ADMIN);
		}
	},
	;

	private static final List<MemberRole> ALL_ROLES = Arrays.asList(MemberRole.values());

	public abstract boolean isMatchWith(MemberRole role);
}
