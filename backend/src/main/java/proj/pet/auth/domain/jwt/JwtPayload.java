package proj.pet.auth.domain.jwt;

import lombok.Builder;
import lombok.Getter;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.MemberRole;

@Getter
@Builder
public class JwtPayload {

	private final String email;
	private final String oauthName;
	private final Country.Campus campus;
	private final MemberRole role;
}
