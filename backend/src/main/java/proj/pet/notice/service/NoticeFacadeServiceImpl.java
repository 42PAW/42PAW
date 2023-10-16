package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.notice.dto.NoticeReadRequestDto;
import proj.pet.notice.dto.NoticeResponseDto;

@Service
@RequiredArgsConstructor
public class NoticeFacadeServiceImpl implements NoticeFacadeService {

	private final NoticeService noticeService;

	@Override
	public NoticeResponseDto getMyNotice(UserSessionDto userSessionDto) {
		return noticeService.getMyNotice(userSessionDto.getMemberId());
	}

	@Override
	public NoticeResponseDto getUnreadNotice(UserSessionDto userSessionDto) {
		return noticeService.getUnreadNotice(userSessionDto.getMemberId());
	}

	@Override
	public void readNotice(UserSessionDto userSessionDto,
			NoticeReadRequestDto noticeReadRequestDto) {
		noticeService.readNotice(userSessionDto.getMemberId(), noticeReadRequestDto.getNoticeIds());
	}
}
