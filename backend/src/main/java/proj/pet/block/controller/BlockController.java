package proj.pet.block.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj.pet.block.service.BlockFacadeService;

import java.util.Map;

@RestController
@RequestMapping("/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

	private final BlockFacadeService blockFacadeService;

	@PostMapping
	public void createBlock(@RequestBody Map<String, Long> body) {
		blockFacadeService.createBlock(body.get("memberId"));
	}

	@DeleteMapping("/members/{memberId}")
	public void deleteBlock(@PathVariable("memberId") Long memberId) {
		blockFacadeService.deleteBlock(memberId);
	}
}
