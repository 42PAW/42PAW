package proj.pet.follow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj.pet.follow.dto.FollowResponseDto;
import proj.pet.follow.service.FollowFacadeService;

import java.util.HashMap;

@RestController
@RequestMapping("/v1/follows")
@RequiredArgsConstructor
public class FollowController {

	private final FollowFacadeService followFacadeService;

	@PostMapping("/")
	public void createFollow(@RequestBody HashMap<String, Long> body) {
		followFacadeService.createFollow(body.get("memberId"));
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
