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
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.follow.dto.FollowPaginationDto;
import proj.pet.follow.dto.FollowRequestDto;
import proj.pet.follow.service.FollowFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

@RestController
@RequestMapping("/v1/follows")
@RequiredArgsConstructor
public class FollowController {

	private final FollowFacadeService followFacadeService;

	/**
	 * 팔로우 생성
	 * <br>
	 * 팔로우 하기를 누르면 팔로우 테이블에 팔로우 정보를 생성 및 저장한다.
	 *
	 * @param userSessionDto   로그인한 사용자 정보
	 * @param followRequestDto 팔로우 생성 요청 정보
	 */
	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createFollow(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody FollowRequestDto followRequestDto) {
		followFacadeService.createFollow(userSessionDto, followRequestDto);
	}

	/**
	 * 팔로우 삭제
	 * <br>
	 * 팔로우 취소를 누르면 팔로우 테이블에서 팔로우 정보를 삭제한다.
	 *
	 * @param userSessionDto 로그인한 사용자 정보
	 * @param memberId       팔로우 삭제할 사용자 id
	 */
	@DeleteMapping("/members/{memberId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteFollow(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("memberId") Long memberId) {
		followFacadeService.deleteFollow(userSessionDto, memberId);
	}

	/**
	 * 내가 팔로우 하는 멤버들 조회
	 *
	 * @param userSessionDto 로그인한 사용자 정보
	 * @param page           페이지 번호
	 * @param size           페이지 사이즈
	 * @return FollowPaginationDto 내가 팔로우하는 멤버들 페이징 정보
	 */
	@GetMapping("/me/followings")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public FollowPaginationDto getMyFollowings(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		return followFacadeService.getMyFollowings(userSessionDto, page, size);
	}

	/**
	 * 다른 사람이 팔로우 하는 멤버들 조회
	 *
	 * @param memberId 팔로우 여부를 확인할 사용자 id
	 * @param page     페이지 번호
	 * @param size     페이지 사이즈
	 * @return FollowPaginationDto 다른 사람의 팔로우하는 멤버들 페이징 정보
	 */
	@GetMapping("/members/{memberId}/followings")
	public FollowPaginationDto getFollowings(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("memberId") Long memberId,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		return followFacadeService.getFollowings(userSessionDto, memberId, page, size);
	}

	/**
	 * 나를 팔로우 하는 멤버들 조회
	 *
	 * @param userSessionDto 로그인한 사용자 정보
	 * @param page           페이지 번호
	 * @param size           페이지 사이즈
	 * @return FollowPaginationDto 나를 팔로우하는 멤버들 페이징 정보
	 */
	@GetMapping("/me/followers")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public FollowPaginationDto getMyFollowers(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		return followFacadeService.getMyFollowers(userSessionDto, page, size);
	}

	/**
	 * 다른 사람을 팔로우 하는 멤버들 조회
	 *
	 * @param memberId 팔로우 여부를 확인할 사용자 id
	 * @param page     페이지 번호
	 * @param size     페이지 사이즈
	 * @return FollowPaginationDto 다른 사람을 팔로우하는 멤버들 페이징 정보
	 */
	@GetMapping("/members/{memberId}/followers")
	public FollowPaginationDto getFollowers(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("memberId") Long memberId,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		return followFacadeService.getFollowers(userSessionDto, memberId, page, size);
	}
}
