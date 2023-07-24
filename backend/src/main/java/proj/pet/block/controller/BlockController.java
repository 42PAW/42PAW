package proj.pet.block.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.block.service.BlockFacadeService;

@RestController("/blocks")
@RequiredArgsConstructor
public class BlockController {

	private final BlockFacadeService blockFacadeService;

	@PostMapping("/")
	public void createBlock() {
		blockFacadeService.createBlock();
	}

	@DeleteMapping("/members/{memberId}")
	public void deleteBlock(@PathVariable("memberId") Long memberId) {
		blockFacadeService.deleteBlock(memberId);
	}
}
