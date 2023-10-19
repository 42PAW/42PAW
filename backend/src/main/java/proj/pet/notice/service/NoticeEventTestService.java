package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.member.repository.MemberRepository;
import proj.pet.notice.domain.NoticeType;

@Component
@RequiredArgsConstructor
public class NoticeEventTestService {
	private final NoticeEventPublisher noticeEventPublisher;
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;


	public void publish(UserSessionDto userSessionDto) {
		noticeEventPublisher.publish(NoticeType.NEW_FOLLOW, userSessionDto.getMemberId(), memberRepository.findById(2L).get());
		noticeEventPublisher.publish(NoticeType.NEW_BOARD_COMMENT, userSessionDto.getMemberId(), boardRepository.findById(1L).get(), memberRepository.findById(2L).get());
	}
}
