package proj.pet.notice.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.notice.dto.NoticeResponseDto;

import java.util.List;

public interface NoticeService {

	NoticeResponseDto getMyNotice(Long loginMemberId, PageRequest pageRequest);

	NoticeResponseDto getUnreadNotice(Long memberId);

	void readNotice(Long memberId, List<Long> noticeIds);
}
