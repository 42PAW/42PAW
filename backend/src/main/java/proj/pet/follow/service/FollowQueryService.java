package proj.pet.follow.service;

import proj.pet.follow.dto.FollowPagenationDto;

public interface FollowQueryService {

	FollowPagenationDto getFollowings(Long memberId, int page, int size);

	FollowPagenationDto getFollowers(Long memberId, int page, int size);
}
