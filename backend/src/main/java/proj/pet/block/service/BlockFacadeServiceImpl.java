package proj.pet.block.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import proj.pet.block.domain.Block;
import proj.pet.block.dto.BlockRequestDto;
import proj.pet.mapper.BlockMapper;
import proj.pet.member.dto.MemberPreviewResponseDto;
import proj.pet.member.dto.UserSessionDto;

@Service
@RequiredArgsConstructor
public class BlockFacadeServiceImpl implements BlockFacadeService {

	private final BlockService blockService;
	private final BlockQueryService blockQueryService;
	private final BlockMapper blockMapper;

	@Override
	public void createBlock(UserSessionDto userSessionDto, BlockRequestDto blockRequestDto) {
		Long memberId = userSessionDto.getMemberId();
		Long blockMemberId = blockRequestDto.getBlockMemberId();
		blockService.blockMember(memberId, blockMemberId);
	}

	@Override
	public void deleteBlock(UserSessionDto userSessionDto, Long memberId) {
		Long blockMemberId = userSessionDto.getMemberId();
		blockService.deleteBlock(memberId, blockMemberId);
	}

	@Override
	public List<MemberPreviewResponseDto> getMyBlockList(
			UserSessionDto userSessionDto, int page, int size) {
		Long memberId = userSessionDto.getMemberId();
		Pageable pageable = PageRequest.of(page, size);
		List<Block> myBlockList = blockQueryService.getBlockList(memberId, pageable);
		return myBlockList.stream().map(blockMapper::toMemberPreviewResponseDto).toList();
	}
}
