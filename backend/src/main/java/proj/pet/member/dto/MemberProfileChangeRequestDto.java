package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class MemberProfileChangeRequestDto {
	private String memberName;
	private String profileImageUrl;
	private String statement;
	private boolean profileImageChanged;
}
