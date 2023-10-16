package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.notice.domain.NoticeType;
import proj.pet.notice.service.NoticeEventPublisher;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@Component
@RequiredArgsConstructor
public class FollowEventPublisher {
	private final MemberRepository memberRepository;
	private final FollowRepository followRepository;
	private final NoticeEventPublisher noticeEventPublisher;

	@Transactional
	public void publish(Long fromId, Long toId) {
		Member from = memberRepository.findById(fromId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		noticeEventPublisher.publish(NoticeType.NEW_FOLLOW, toId, from);
	}
}
