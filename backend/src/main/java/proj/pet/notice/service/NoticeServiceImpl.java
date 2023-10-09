package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.notice.domain.Notice;
import proj.pet.notice.dto.NoticeResponseDto;
import proj.pet.notice.repository.NoticeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;

	@Override
	public NoticeResponseDto getMyNotice(Long loginMemberId) {
		List<Notice> notices = noticeRepository.findAllByReceiverId(loginMemberId);
		return null;
	}
}
