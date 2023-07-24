package proj.pet.follow.service;

import proj.pet.follow.dto.FollowResponseDto;

public interface FollowFacadeService {

	void createFollow();

	void deleteFollow(Long memberId);

	FollowResponseDto getFollowings(Long memberId);

	FollowResponseDto getFollowers(Long memberId);
}
