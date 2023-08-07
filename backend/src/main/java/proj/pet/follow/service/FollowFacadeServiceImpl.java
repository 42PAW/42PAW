package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
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
		return followQueryService.getFollowings(userSessionDto.getMemberId(), page, size);
	}

	@Override
	public FollowPagenationDto getFollowings(Long memberId, int page, int size) {
		return followQueryService.getFollowings(memberId, page, size);
	}

	@Override
	public FollowPagenationDto getMyFollowers(UserSessionDto userSessionDto, int page, int size) {
		return followQueryService.getFollowers(userSessionDto.getMemberId(), page, size);
	}

	@Override
	public FollowPagenationDto getFollowers(Long memberId, int page, int size) {
		return followQueryService.getFollowers(memberId, page, size);
	}
}
