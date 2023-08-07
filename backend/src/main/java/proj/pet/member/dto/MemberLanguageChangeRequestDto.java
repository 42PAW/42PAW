package proj.pet.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.member.domain.Language;

@Getter
@AllArgsConstructor
public class MemberLanguageChangeRequestDto {

	private final Language language;
}
