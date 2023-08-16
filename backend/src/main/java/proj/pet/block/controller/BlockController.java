package proj.pet.block.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.block.dto.BlockRequestDto;
import proj.pet.block.service.BlockFacadeService;
import proj.pet.member.dto.MemberPreviewResponseDto;

import java.util.List;

@RestController
@RequestMapping("/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

	private final BlockFacadeService blockFacadeService;

	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createBlock(@RequestBody BlockRequestDto blockRequestDto) {
		//TODO: user 세션 정보를 가져와서 memberId를 넘겨줘야함
//		blockFacadeService.createBlock(, blockRequestDto);
	}

	@DeleteMapping("/members/{memberId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteBlock(@PathVariable("memberId") Long memberId) {
		//TODO: user 세션 정보를 가져와서 memberId를 넘겨줘야함
//		blockFacadeService.deleteBlock(, memberId);
	}

	@GetMapping("/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public List<MemberPreviewResponseDto> getMyBlockList(
			@PathVariable("page") int page,
			@PathVariable("size") int size
	) {
		//TODO: user 세션 정보를 가져와서 memberId를 넘겨줘야함
//		return blockFacadeService.getMyBlockList(, page, size);
		return null;
	}
}
