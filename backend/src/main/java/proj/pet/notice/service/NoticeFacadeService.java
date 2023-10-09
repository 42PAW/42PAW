package proj.pet.notice.service;

import proj.pet.member.dto.UserSessionDto;
import proj.pet.notice.dto.NoticeResponseDto;

public interface NoticeFacadeService {

	NoticeResponseDto getMyNotice(UserSessionDto userSessionDto);
}
