package proj.pet.auth.domain;

import lombok.Builder;
import lombok.Getter;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.Language;
import proj.pet.member.domain.MemberRole;

@Getter
@Builder
public class FtPayload {

	private final Long id;
	private final String email;
	private final String nickname;
	private final Country country;
	private final Language language;
	private final MemberRole role;
	
}
