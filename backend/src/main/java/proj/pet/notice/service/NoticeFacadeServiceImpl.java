package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.notice.dto.NoticeResponseDto;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeFacadeServiceImpl implements NoticeFacadeService {

	private final NoticeService noticeService;

	@Override
	public NoticeResponseDto getMyNotice(UserSessionDto userSessionDto, PageRequest pageRequest) {
		return noticeService.getMyNotice(userSessionDto.getMemberId(), pageRequest);
	}
}
