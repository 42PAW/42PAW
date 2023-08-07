package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.follow.repository.FollowRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowServiceImpl implements FollowService {

	private final FollowRepository followRepository;

	@Override
	public void createFollow(Long memberId, Long followMemberId) {

	}

	@Override
	public void deleteFollow(Long memberId, Long followMemberId) {

	}
}
