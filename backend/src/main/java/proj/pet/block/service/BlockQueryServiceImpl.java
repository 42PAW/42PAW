package proj.pet.block.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlockQueryServiceImpl implements BlockQueryService {

	private final BlockRepository blockRepository;

	@Override
	public List<Block> getBlockList(Long memberId, int page, int size) {
		return blockRepository.findAllByMemberId(memberId, PageRequest.of(page, size)).toList();
	}
}
