package proj.pet.member.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.member.dto.MemberCreateRequestDto;
import proj.pet.member.dto.MemberLanguageChangeRequestDto;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberNicknameValidateResponseDto;
import proj.pet.member.dto.MemberProfileChangeRequestDto;
import proj.pet.member.dto.MemberProfileChangeResponseDto;
import proj.pet.member.dto.MemberProfileResponseDto;
import proj.pet.member.dto.MemberSearchPaginationDto;
import proj.pet.member.dto.UserSessionDto;

public interface MemberFacadeService {

	void createMember(UserSessionDto userSessionDto,
			HttpServletRequest req,
			HttpServletResponse res,
			MemberCreateRequestDto memberCreateRequestDto);

	MemberNicknameValidateResponseDto validateMemberNickname(String nickname);

	MemberMyInfoResponseDto getMyInfo(UserSessionDto userSessionDto);

	MemberProfileResponseDto getMyProfile(UserSessionDto userSessionDto);

	MemberProfileResponseDto getMemberProfile(UserSessionDto userSessionDto, Long memberId);

	MemberProfileChangeResponseDto changeMemberProfile(
			UserSessionDto userSessionDto,
			MemberProfileChangeRequestDto memberProfileChangeRequestDto);

	BoardsPaginationDto getMyBoards(UserSessionDto userSessionDto, PageRequest pageable);

	BoardsPaginationDto getMemberBoards(UserSessionDto userSessionDto, Long memberId,
			PageRequest pageable);

	MemberSearchPaginationDto searchMemberByName(UserSessionDto userSessionDto, String partialName,
			PageRequest pageable);

	void changeLanguage(UserSessionDto userSession,
			MemberLanguageChangeRequestDto memberLanguageChangeRequestDto);
}
