package proj.pet.member.service;

import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.dto.MemberCreateRequestDto;
import proj.pet.member.dto.MemberLanguageChangeRequestDto;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberMyProfileResponseDto;
import proj.pet.member.dto.MemberNicknameValidateResponseDto;
import proj.pet.member.dto.MemberPreviewResponseDto;
import proj.pet.member.dto.MemberProfileChangeRequestDto;
import proj.pet.member.dto.MemberProfileChangeResponseDto;
import proj.pet.member.dto.MemberSearchResponseDto;
import proj.pet.member.dto.UserSessionDto;

public interface MemberFacadeService {

	void createMember(MemberCreateRequestDto memberCreateRequestDto);

	MemberNicknameValidateResponseDto validateMemberNickname(String nickname);

	MemberMyInfoResponseDto getMyInfo(UserSessionDto userSessionDto);

	MemberMyProfileResponseDto getMyProfile(UserSessionDto userSessionDto);

	MemberProfileChangeResponseDto changeMemberProfile(
			UserSessionDto userSessionDto,
			MemberProfileChangeRequestDto memberProfileChangeRequestDto);

	MemberPreviewResponseDto getMemberPreview(Long memberId);

	BoardsResponseDto getMyBoards(UserSessionDto userSessionDto, int page, int size);

	BoardsResponseDto getMemberBoards(Long memberId, int page, int size);

	MemberSearchResponseDto searchMemberByName(String nickname, int page, int size);

	void changeLanguage(UserSessionDto userSession,
			MemberLanguageChangeRequestDto memberLanguageChangeRequestDto);
}
