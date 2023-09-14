package proj.pet.member.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Language;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberLanguageChangeRequestDto {
	@NotNull
	private Language language;
}
