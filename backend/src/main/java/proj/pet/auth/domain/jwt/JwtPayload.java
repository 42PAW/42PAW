package proj.pet.auth.domain.jwt;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import proj.pet.exception.DomainException;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.MemberRole;
import proj.pet.member.domain.OauthProfile;
import proj.pet.member.domain.OauthType;

import java.util.Map;

import static proj.pet.exception.ExceptionStatus.INCORRECT_ARGUMENT;

/**
 * 서버 내부에서 사용하는 서버 토큰의 Payload
 */
@Getter
@Builder
@ToString
public class JwtPayload {

	private final OauthProfile profile;
	private final String email;
	private final Country.Campus campus; // 확장된다면 분리
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
					.profile(
							OauthProfile.of(
									OauthType.valueOf(claims.get("oauthType").toString()),
									claims.get("oauthId").toString(),
									claims.get("oauthName").toString()))
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
				"oauthId", profile.getId(),
				"oauthName", profile.getName(),
				"oauthType", profile.getType(),
				"campus", campus,
				"role", role
		);
	}
}
