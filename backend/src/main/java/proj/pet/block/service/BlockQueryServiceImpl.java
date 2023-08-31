package proj.pet.block.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.domain.Block;
import proj.pet.block.repository.BlockRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlockQueryServiceImpl implements BlockQueryService {

	private final BlockRepository blockRepository;

	@Override
	public List<Block> getBlockList(Long memberId, Pageable pageable) {
		System.out.println("memberId = " + memberId + ", pageable = " + pageable);
		return blockRepository.findAllByMemberId(memberId, pageable).toList();
	}
}
