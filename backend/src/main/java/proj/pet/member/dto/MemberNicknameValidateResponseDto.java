package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberNicknameValidateResponseDto {

	private final boolean isValid;
}
