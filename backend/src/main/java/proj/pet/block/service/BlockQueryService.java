package proj.pet.block.service;

import java.util.List;
import org.springframework.data.domain.Pageable;
import proj.pet.block.domain.Block;

public interface BlockQueryService {

	List<Block> getBlockList(Long memberId, Pageable pageable);
}
