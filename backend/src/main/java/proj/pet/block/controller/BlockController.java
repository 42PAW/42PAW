package proj.pet.block.controller;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.block.service.BlockFacadeService;

@RestController("/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

	private final BlockFacadeService blockFacadeService;

	@PostMapping("/")
	public void createBlock(@RequestBody Map<String, Long> body) {
		blockFacadeService.createBlock(body.get("memberId"));
	}

	@DeleteMapping("/members/{memberId}")
	public void deleteBlock(@PathVariable("memberId") Long memberId) {
		blockFacadeService.deleteBlock(memberId);
	}
}
