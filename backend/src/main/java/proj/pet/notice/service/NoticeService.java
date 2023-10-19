package proj.pet.notice.service;

import java.util.List;
import proj.pet.notice.dto.NoticeResponseDto;

public interface NoticeService {

	NoticeResponseDto getMyNotice(Long loginMemberId);

	NoticeResponseDto getUnreadNotice(Long memberId);

	void readNotice(Long memberId, List<Long> noticeIds);
}
