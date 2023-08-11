package proj.pet.member.service;

import proj.pet.member.dto.MemberMyInfoResponseDto;

public interface MemberQueryService {

	MemberMyInfoResponseDto getMyInfo(Long loginUserId);
}
