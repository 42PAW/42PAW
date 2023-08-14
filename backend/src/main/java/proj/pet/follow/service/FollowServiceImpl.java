package proj.pet.follow.service;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;

import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.follow.domain.Follow;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowServiceImpl implements FollowService {

	private final FollowRepository followRepository;
	private final MemberRepository memberRepository;

	/**
	 * 팔로우 하는 사람과 팔로우 받는 사람의 id를 받아 팔로우를 생성
	 *
	 * @param memberId       팔로우 하는 사람의 id
	 * @param followMemberId 팔로우 받는 사람의 id
	 * @throws proj.pet.exception.ServiceException 팔로우 하는 사람이나 팔로우 받는 사람이 없을 경우
	 */
	@Override
	public void createFollow(Long memberId, Long followMemberId) {
		Member member = memberRepository.findById(memberId)
				.orElseThrow(INVALID_ARGUMENT::asServiceException);
		Member followMember = memberRepository.findById(followMemberId)
				.orElseThrow(INVALID_ARGUMENT::asServiceException);
		followRepository.save(Follow.of(member, followMember, LocalDateTime.now()));
	}

	/**
	 * 팔로우 하는 사람과 팔로우 받는 사람의 id를 받아 팔로우를 삭제
	 *
	 * @param memberId       팔로우 하는 사람의 id
	 * @param followMemberId 팔로우 받는 사람의 id
	 * @throws proj.pet.exception.ServiceException 팔로우 하는 사람이나 팔로우 받는 사람이 없을 경우
	 */
	@Override
	public void deleteFollow(Long memberId, Long followMemberId) {
		followRepository.findByMemberCompositeKey(memberId, followMemberId)
				.ifPresent(followRepository::delete);
	}
}
