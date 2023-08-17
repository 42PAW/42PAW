package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Language;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberLanguageChangeRequestDto {

	private Language language;
}
