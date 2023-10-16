package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import proj.pet.follow.dto.FollowPaginationDto;
import proj.pet.follow.dto.FollowRequestDto;
import proj.pet.member.dto.UserSessionDto;

@Service
@RequiredArgsConstructor
public class FollowFacadeServiceImpl implements FollowFacadeService {

	private final FollowService followService;
	private final FollowQueryService followQueryService;
	private final FollowEventPublisher followEventPublisher;

	@Override
	public void createFollow(UserSessionDto userSessionDto, FollowRequestDto followRequestDto) {
		followService.createFollow(userSessionDto.getMemberId(), followRequestDto.getMemberId());
		followEventPublisher.publish(userSessionDto.getMemberId(), followRequestDto.getMemberId());
	}

	@Override
	public void deleteFollow(UserSessionDto userSessionDto, Long memberId) {
		followService.deleteFollow(userSessionDto.getMemberId(), memberId);
	}

	@Override
	public FollowPaginationDto getMyFollowings(UserSessionDto userSessionDto, int page, int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return followQueryService.getFollowings(userSessionDto.getMemberId(), userSessionDto.getMemberId(), pageable);
	}

	@Override
	public FollowPaginationDto getFollowings(UserSessionDto userSessionDto, Long memberId, int page,
	                                         int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return followQueryService.getFollowings(userSessionDto.getMemberId(), memberId, pageable);
	}

	@Override
	public FollowPaginationDto getMyFollowers(UserSessionDto userSessionDto, int page, int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return followQueryService.getFollowers(userSessionDto.getMemberId(), userSessionDto.getMemberId(), pageable);
	}

	@Override
	public FollowPaginationDto getFollowers(UserSessionDto userSessionDto, Long memberId, int page,
	                                        int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return followQueryService.getFollowers(userSessionDto.getMemberId(), memberId, pageable);
	}
}
