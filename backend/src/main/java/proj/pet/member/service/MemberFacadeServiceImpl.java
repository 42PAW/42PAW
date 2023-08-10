package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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

@Service
@RequiredArgsConstructor
public class MemberFacadeServiceImpl implements MemberFacadeService {

	@Override
	public void createMember(MemberCreateRequestDto memberCreateRequestDto) {
	}

	@Override
	public MemberNicknameValidateResponseDto validateMemberNickname(String nickname) {
		return null;
	}

	@Override
	public MemberMyInfoResponseDto getMyInfo(UserSessionDto userSessionDto) {
		return null;
	}

	@Override
	public MemberMyProfileResponseDto getMyProfile(UserSessionDto userSessionDto) {
		return null;
	}

	@Override
	public MemberProfileChangeResponseDto changeMemberProfile(
			UserSessionDto userSessionDto,
			MemberProfileChangeRequestDto memberProfileChangeRequestDto) {
		return null;
	}

	@Override
	public MemberPreviewResponseDto getMemberPreview(Long memberId) {
		return null;
	}

	@Override
	public BoardsResponseDto getMyBoards(UserSessionDto userSessionDto, int page, int size) {
		return null;
	}

	@Override
	public BoardsResponseDto getMemberBoards(Long memberId, int page, int size) {
		return null;
	}

	@Override
	public MemberSearchResponseDto searchMemberByName(String nickname, int page, int size) {
		return null;
	}

	@Override
	public void changeLanguage(UserSessionDto userSession,
			MemberLanguageChangeRequestDto memberLanguageChangeRequestDto) {

	}
}
