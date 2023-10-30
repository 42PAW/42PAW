package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberProfileChangeRequestDto {
	private String memberName;
	private String profileImageUrl;
	private String statement;
	private boolean profileImageChanged;
}
