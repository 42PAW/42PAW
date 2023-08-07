package proj.pet.follow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.follow.dto.FollowPagenationDto;
import proj.pet.follow.dto.FollowRequestDto;
import proj.pet.follow.service.FollowFacadeService;

@RestController
@RequestMapping("/v1/follows")
@RequiredArgsConstructor
public class FollowController {

	private final FollowFacadeService followFacadeService;

	@PostMapping("/")
	public void createFollow(@RequestBody FollowRequestDto followRequestDto) {
		//TODO: user 세션 정보로 memberId를 가져와서 넣어줘야 함
//		followFacadeService.createFollow(, followRequestDto);
	}

	@DeleteMapping("/members/{memberId}")
	public void deleteFollow(@PathVariable("memberId") Long memberId) {
		//TODO: user 세션 정보로 memberId를 가져와서 넣어줘야 함
//		followFacadeService.deleteFollow(, memberId);
	}

	@GetMapping("/me/followings")
	public FollowPagenationDto getMyFollowings(
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		//TODO: user 세션 정보로 memberId를 가져와서 넣어줘야 함
//		return followFacadeService.getMyFollowings(, page, size);
		return null;
	}

	@GetMapping("/members/{memberId}/followings")
	public FollowPagenationDto getFollowings(
			@PathVariable("memberId") Long memberId,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		return followFacadeService.getFollowings(memberId, page, size);
	}

	@GetMapping("/me/followers")
	public FollowPagenationDto getMyFollowers(
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		//TODO: user 세션 정보로 memberId를 가져와서 넣어줘야 함
//		return followFacadeService.getMyFollowers(, page, size);
		return null;
	}

	@GetMapping("/members/{memberId}/followers")
	public FollowPagenationDto getFollowers(
			@PathVariable("memberId") Long memberId,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		return followFacadeService.getFollowers(memberId, page, size);
	}
}
