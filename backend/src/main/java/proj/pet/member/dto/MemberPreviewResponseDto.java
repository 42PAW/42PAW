package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.follow.domain.FollowType;
import proj.pet.member.domain.Country;

@Getter
@AllArgsConstructor
public class MemberPreviewResponseDto {

	private final String memberName;
	private final String intraName;
	private final String profileImage;
	private final Country country;
	private final String statement;
	private final FollowType relationship;
}
