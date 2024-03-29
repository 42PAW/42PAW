package proj.pet.member.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Language;

@Getter
@AllArgsConstructor
public class MemberMyInfoResponseDto {

	private final Long memberId;
	private final String memberName;
	private final String intraName;
	private final String profileImageUrl;
	private final Language language;
	private final List<Species> animalCategories;
}
