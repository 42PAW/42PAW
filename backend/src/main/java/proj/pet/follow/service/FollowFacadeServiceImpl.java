package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.follow.dto.FollowResponseDto;

@Service
@RequiredArgsConstructor
public class FollowFacadeServiceImpl implements FollowFacadeService {

	private final FollowService followService;
	private final FollowQueryService followQueryService;

	@Override
	public void createFollow() {

	}

	@Override
	public void deleteFollow(Long memberId) {

	}

	@Override
	public FollowResponseDto getFollowings(Long memberId) {
		return null;
	}

	@Override
	public FollowResponseDto getFollowers(Long memberId) {
		return null;
	}
}
