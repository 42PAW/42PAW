package proj.pet.block.service;

import java.util.List;
import proj.pet.block.dto.BlockRequestDto;
import proj.pet.member.dto.MemberPreviewResponseDto;
import proj.pet.member.dto.UserSessionDto;

public interface BlockFacadeService {

	void createBlock(UserSessionDto userSessionDto, BlockRequestDto blockRequestDto);

	void deleteBlock(UserSessionDto userSessionDto, Long memberId);

	List<MemberPreviewResponseDto> getMyBlockList(
			UserSessionDto userSessionDto, int page, int size);
}
