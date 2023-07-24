package proj.pet.member.dto;

import lombok.Builder;
import lombok.Getter;
import proj.pet.member.domain.Role;

@Getter
public class UserSession {
	private Long memberId;
	private String nickname;
	private Role role;

	@Builder
	public UserSession(Long memberId, String nickname, Role role) {
		this.memberId = memberId;
		this.nickname = nickname;
		this.role = role;
	}
}
