package proj.pet.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberCreateResponse {
	private final Long memberId;
	private final String nickname;
	private final String profileImageUrl;
	private final String email;
}
