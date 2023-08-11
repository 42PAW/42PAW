package proj.pet.member.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.auth.service.OauthService;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.dto.*;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberFacadeServiceImpl implements MemberFacadeService {

	private final MemberService memberService;
	private final OauthService oauthService;

	@Override
	public void createMember(HttpServletRequest req, HttpServletResponse res, MemberCreateRequestDto memberCreateRequestDto) {
		memberService.createMember(memberCreateRequestDto);
		oauthService.refreshRoleOfServerToken(req, res, LocalDateTime.now());
	}

	@Override
	public MemberNicknameValidateResponseDto validateMemberNickname(String nickname) {
		return null;
	}

	@Override
	public MemberMyInfoResponseDto getMyInfo(UserSessionDto userSessionDto) {
		return memberService.getMyInfo(userSessionDto.getMemberId());
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
