package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import proj.pet.follow.dto.FollowPagenationDto;
import proj.pet.follow.dto.FollowRequestDto;
import proj.pet.member.dto.UserSessionDto;

@Service
@RequiredArgsConstructor
public class FollowFacadeServiceImpl implements FollowFacadeService {

	private final FollowService followService;
	private final FollowQueryService followQueryService;

	@Override
	public void createFollow(UserSessionDto userSessionDto, FollowRequestDto followRequestDto) {
		followService.createFollow(userSessionDto.getMemberId(), followRequestDto.getMemberId());
	}

	@Override
	public void deleteFollow(UserSessionDto userSessionDto, Long memberId) {
		followService.deleteFollow(userSessionDto.getMemberId(), memberId);
	}

	@Override
	public FollowPagenationDto getMyFollowings(UserSessionDto userSessionDto, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return followQueryService.getFollowings(userSessionDto.getMemberId(), pageable);
	}

	@Override
	public FollowPagenationDto getFollowings(Long memberId, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return followQueryService.getFollowings(memberId, pageable);
	}

	@Override
	public FollowPagenationDto getMyFollowers(UserSessionDto userSessionDto, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return followQueryService.getFollowers(userSessionDto.getMemberId(), pageable);
	}

	@Override
	public FollowPagenationDto getFollowers(Long memberId, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		return followQueryService.getFollowers(memberId, pageable);
	}
}
