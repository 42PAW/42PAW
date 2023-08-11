package proj.pet.auth.domain.jwt;

import lombok.Builder;
import lombok.Getter;
import proj.pet.exception.DomainException;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.MemberRole;

import java.util.Map;

import static proj.pet.exception.ExceptionStatus.INCORRECT_ARGUMENT;

/**
 * 서버 내부에서 사용하는 서버 토큰의 Payload
 */
@Getter
@Builder
public class JwtPayload {

	private final String email;
	private final String oauthName;
	private final Country.Campus campus;
	private final MemberRole role;

	/**
	 * JWT Payload를 Map으로부터 생성
	 *
	 * @param claims Payload를 담고 있는 Map
	 * @return JwtPayload
	 */
	public static JwtPayload from(Map<String, Object> claims) {
		System.out.println("claims = " + claims);
		try {
			return JwtPayload.builder()
					.email((String) claims.get("email"))
					.oauthName((String) claims.get("oauthName"))
					.campus(Country.Campus.from(claims.get("campus").toString()))
					.role(MemberRole.from(claims.get("role").toString()))
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DomainException(INCORRECT_ARGUMENT);
		}
	}

	/**
	 * JwtPayload를 Map으로 변환
	 *
	 * @return Map
	 */
	public Map<String, Object> toClaims() {
		return Map.of(
				"email", email,
				"oauthName", oauthName,
				"campus", campus,
				"role", role
		);
	}
}
