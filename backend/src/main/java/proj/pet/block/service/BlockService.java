package proj.pet.block.service;

import proj.pet.block.domain.Block;

public interface BlockService {

	Block blockMember(Long memberId, Long blockMemberId);

	void deleteBlock(Long memberId, Long blockMemberId);
}
