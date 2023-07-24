package proj.pet.block.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlockFacadeServiceImpl implements BlockFacadeService {

	private final BlockService blockService;

	@Override
	public void createBlock() {

	}

	@Override
	public void deleteBlock(Long memberId) {

	}
}
