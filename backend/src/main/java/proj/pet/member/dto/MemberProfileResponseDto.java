package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.follow.domain.FollowType;
import proj.pet.member.domain.Country;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberProfileResponseDto {

	private final String memberName;
	private final String intraName;
	private final LocalDateTime nicknameUpdatedAt;
	private final String profileImageUrl;
	private final Country country;
	private final Country.Campus campus;
	private final String statement;
	private final long followingCount;
	private final long followerCount;
	private final long boardCount;
	private final FollowType followType;
}
