package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.member.domain.Role;

/**
 * 사용 중인 로그인한 유저의 세션 정보를 담은 DTO입니다.
 *
 * TODO: 내용 바뀔 수 있음
 */
@Getter
@AllArgsConstructor
public class UserSession {
	private final Long memberId;
	private final String nickname;
	private final Role role;
}
