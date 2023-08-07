package proj.pet.follow.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Getter
@AllArgsConstructor
public class FollowPagenationDto {

	private final List<MemberPreviewResponseDto> result;
	private final long totalLength;
}
