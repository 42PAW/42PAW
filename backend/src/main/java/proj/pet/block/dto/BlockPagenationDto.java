package proj.pet.block.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Getter
@AllArgsConstructor
public class BlockPagenationDto {

	private final List<MemberPreviewResponseDto> result;
	private final long totalLength;
}
