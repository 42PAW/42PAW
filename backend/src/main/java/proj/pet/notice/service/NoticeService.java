package proj.pet.notice.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.notice.dto.NoticeResponseDto;

public interface NoticeService {

	NoticeResponseDto getMyNotice(Long loginMemberId, PageRequest pageRequest);
}
