package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberProfileChangeResponseDto {
	
	private final String memberName;
	private final String imageUrl;
	private final String statement;
}
