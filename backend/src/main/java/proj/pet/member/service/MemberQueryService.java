package proj.pet.member.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberNicknameValidateResponseDto;
import proj.pet.member.dto.MemberProfileResponseDto;
import proj.pet.member.dto.MemberSearchPaginationDto;

public interface MemberQueryService {

	MemberNicknameValidateResponseDto validateMemberNickname(String nickname);

	MemberMyInfoResponseDto getMyInfo(Long loginUserId);

	MemberProfileResponseDto getMyProfile(Long loginUserId);

	MemberProfileResponseDto getMemberProfile(Long loginUserId, Long memberId);

	MemberSearchPaginationDto searchMemberByName(Long memberId, String partialName,
			PageRequest pageable);
}
