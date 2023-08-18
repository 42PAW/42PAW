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
	private final int followingCount;
	private final int followerCount;
	private final int boardCount;
	private final FollowType followType;
}
