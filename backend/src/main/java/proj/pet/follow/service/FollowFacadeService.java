package proj.pet.follow.service;

import proj.pet.follow.dto.FollowPagenationDto;
import proj.pet.follow.dto.FollowRequestDto;
import proj.pet.member.dto.UserSessionDto;

public interface FollowFacadeService {

	void createFollow(UserSessionDto userSessionDto, FollowRequestDto followRequestDto);

	void deleteFollow(UserSessionDto userSessionDto, Long memberId);

	FollowPagenationDto getMyFollowings(UserSessionDto userSessionDto, int page, int size);

	FollowPagenationDto getFollowings(Long memberId, int page, int size);

	FollowPagenationDto getMyFollowers(UserSessionDto userSessionDto, int page, int size);

	FollowPagenationDto getFollowers(Long memberId, int page, int size);
}
