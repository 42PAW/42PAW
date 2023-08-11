package proj.pet.member.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.dto.*;

public interface MemberFacadeService {

	void createMember(HttpServletRequest req, HttpServletResponse res, MemberCreateRequestDto memberCreateRequestDto);

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
