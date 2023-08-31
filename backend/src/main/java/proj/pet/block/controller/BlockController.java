package proj.pet.block.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.block.dto.BlockRequestDto;
import proj.pet.block.service.BlockFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.MemberPreviewResponseDto;
import proj.pet.member.dto.UserSessionDto;

@RestController
@RequestMapping("/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

	private final BlockFacadeService blockFacadeService;

	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createBlock(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody BlockRequestDto blockRequestDto) {
		blockFacadeService.createBlock(userSessionDto, blockRequestDto);
	}

	@DeleteMapping("/members/{memberId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteBlock(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("memberId") Long memberId) {
		blockFacadeService.deleteBlock(userSessionDto, memberId);
	}

	@GetMapping("/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public List<MemberPreviewResponseDto> getMyBlockList(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		System.out.println(userSessionDto + "\n$$$\n" + page + "\n$$$\n" + size);
		return blockFacadeService.getMyBlockList(userSessionDto, page, size);
	}
}
