package proj.pet.block.service;

import java.util.List;
import proj.pet.block.domain.Block;

public interface BlockQueryService {

	List<Block> getBlockList(Long memberId, int page, int size);
}
