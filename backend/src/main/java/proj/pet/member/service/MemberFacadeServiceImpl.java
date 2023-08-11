package proj.pet.member.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.auth.domain.jwt.JwtTokenManager;
import proj.pet.auth.service.OauthService;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.*;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberFacadeServiceImpl implements MemberFacadeService {

	private final MemberService memberService;
	private final MemberQueryService memberQueryService;
	private final OauthService oauthService;
	private final JwtTokenManager tokenManager;

	@Override
	public void createMember(HttpServletRequest req, HttpServletResponse res, MemberCreateRequestDto memberCreateRequestDto) {
		JwtPayload payload = oauthService.extractPayloadFromServerToken(req);
		Member member = memberService.createMember(
				payload,
				memberCreateRequestDto.getMemberName(),
				memberCreateRequestDto.getStatement(),
				memberCreateRequestDto.getCategoryFilters(),
				LocalDateTime.now()
		);
		memberService.uploadMemberProfileImage(member.getId(), memberCreateRequestDto.getImageData());
		oauthService.refreshRoleOfServerToken(req, res, LocalDateTime.now());
	}

	@Override
	public MemberNicknameValidateResponseDto validateMemberNickname(String nickname) {
		return null;
	}

	@Override
	public MemberMyInfoResponseDto getMyInfo(UserSessionDto userSessionDto) {
		return memberQueryService.getMyInfo(userSessionDto.getMemberId());
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
