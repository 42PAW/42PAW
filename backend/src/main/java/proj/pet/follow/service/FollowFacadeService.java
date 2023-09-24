package proj.pet.follow.service;

import proj.pet.follow.dto.FollowPaginationDto;
import proj.pet.follow.dto.FollowRequestDto;
import proj.pet.member.dto.UserSessionDto;

public interface FollowFacadeService {

	void createFollow(UserSessionDto userSessionDto, FollowRequestDto followRequestDto);

	void deleteFollow(UserSessionDto userSessionDto, Long memberId);

	FollowPaginationDto getMyFollowings(UserSessionDto userSessionDto, int page, int size);

	FollowPaginationDto getFollowings(UserSessionDto userSessionDto, Long memberId,
			int page, int size);

	FollowPaginationDto getMyFollowers(UserSessionDto userSessionDto, int page, int size);

	FollowPaginationDto getFollowers(UserSessionDto userSessionDto, Long memberId,
			int page, int size);
}
