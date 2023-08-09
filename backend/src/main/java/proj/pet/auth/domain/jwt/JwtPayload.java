package proj.pet.auth.domain.jwt;

import lombok.Builder;
import lombok.Getter;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.MemberRole;

import java.util.Map;

@Getter
@Builder
public class JwtPayload {

	private final String email;
	private final String nickname;
	private final Country country;
	private final MemberRole role;

	public static JwtPayload from(Map<String, Object> claims) {
		return JwtPayload.builder()
				.email(claims.get("email").toString())
				.nickname(claims.get("nickname").toString())
				.country((Country) claims.get("country"))
				.role((MemberRole) claims.get("role"))
				.build();
	}
}
