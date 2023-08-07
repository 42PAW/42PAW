package proj.pet.block.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.block.dto.BlockRequestDto;
import proj.pet.block.service.BlockFacadeService;
import proj.pet.member.dto.MemberPreviewResponseDto;

@RestController
@RequestMapping("/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

	private final BlockFacadeService blockFacadeService;

	@PostMapping("/")
	public void createBlock(@RequestBody BlockRequestDto blockRequestDto) {
		//TODO: user 세션 정보를 가져와서 memberId를 넘겨줘야함
//		blockFacadeService.createBlock(, blockRequestDto);
	}

	@DeleteMapping("/members/{memberId}")
	public void deleteBlock(@PathVariable("memberId") Long memberId) {
		//TODO: user 세션 정보를 가져와서 memberId를 넘겨줘야함
//		blockFacadeService.deleteBlock(, memberId);
	}

	@GetMapping("/me")
	public List<MemberPreviewResponseDto> getMyBlockList(
			@PathVariable("page") int page,
			@PathVariable("size") int size
	) {
		//TODO: user 세션 정보를 가져와서 memberId를 넘겨줘야함
//		return blockFacadeService.getMyBlockList(, page, size);
		return null;
	}
}
