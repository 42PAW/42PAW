package proj.pet.member.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberSearchResponseDto {

	private final List<MemberPreviewResponseDto> result;
	private final long totalLength;
}
