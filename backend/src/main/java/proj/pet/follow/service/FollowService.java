package proj.pet.follow.service;

public interface FollowService {

	void createFollow(Long memberId, Long followMemberId);

	void deleteFollow(Long memberId, Long followMemberId);
}
