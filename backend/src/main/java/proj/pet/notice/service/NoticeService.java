package proj.pet.notice.service;

import proj.pet.notice.dto.NoticeResponseDto;

public interface NoticeService {

	NoticeResponseDto getMyNotice(Long loginMemberId);
}
