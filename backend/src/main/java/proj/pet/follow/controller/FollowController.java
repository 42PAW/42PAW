package proj.pet.follow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.follow.dto.FollowResponseDto;
import proj.pet.follow.service.FollowFacadeService;

@RestController("/v1/follows")
@RequiredArgsConstructor
public class FollowController {

	private final FollowFacadeService followFacadeService;

	@PostMapping("/")
	public void createFollow() {
		followFacadeService.createFollow();
	}

	@DeleteMapping("/members/{memberId}")
	public void deleteFollow(@PathVariable("memberId") Long memberId) {
		followFacadeService.deleteFollow(memberId);
	}

	@GetMapping("/members/{memberId}/followings")
	public FollowResponseDto getFollowings(@PathVariable("memberId") Long memberId) {
		return followFacadeService.getFollowings(memberId);
	}

	@GetMapping("/members/{memberId}/followers")
	public FollowResponseDto getFollowers(@PathVariable("memberId") Long memberId) {
		return followFacadeService.getFollowers(memberId);
	}
}
