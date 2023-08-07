package proj.pet.member.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.member.domain.Country;

@Getter
@AllArgsConstructor
public class MemberMyProfileResponseDto {

	private final String memberName;
	private final String intraName;
	private final LocalDateTime nicknameUpdatedAt;
	private final String profileImage;
	private final Country country;
	private final String statement;
	private final int followingCount;
	private final int followerCount;
	private final int boardCount;
}
