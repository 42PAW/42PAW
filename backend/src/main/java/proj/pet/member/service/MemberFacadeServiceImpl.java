package proj.pet.member.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.auth.service.OauthService;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.service.BoardQueryService;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberCreateRequestDto;
import proj.pet.member.dto.MemberLanguageChangeRequestDto;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberNicknameValidateResponseDto;
import proj.pet.member.dto.MemberProfileChangeRequestDto;
import proj.pet.member.dto.MemberProfileChangeResponseDto;
import proj.pet.member.dto.MemberProfileResponseDto;
import proj.pet.member.dto.MemberSearchPaginationDto;
import proj.pet.member.dto.UserSessionDto;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberFacadeServiceImpl implements MemberFacadeService {

	private final MemberService memberService;
	private final MemberQueryService memberQueryService;
	private final OauthService oauthService;
	private final BoardQueryService boardQueryService;

	/**
	 * 회원가입
	 *
	 * @param userSessionDto         로그인한 유저의 세션 정보
	 * @param req                    요청
	 * @param res                    응답
	 * @param memberCreateRequestDto 회원가입 요청 정보
	 */
	@Override
	public void createMember(UserSessionDto userSessionDto,
			HttpServletRequest req,
			HttpServletResponse res,
			MemberCreateRequestDto memberCreateRequestDto) {
		JwtPayload payload = oauthService.extractPayloadFromServerToken(req);
		Member member = memberService.createMember(
				payload,
				memberCreateRequestDto.getMemberName(),
				memberCreateRequestDto.getStatement(),
				memberCreateRequestDto.getCategoryFilters(),
				LocalDateTime.now()
		);
		member.changeProfileImageUrl(memberCreateRequestDto.getImageUrl());
		oauthService.refreshRoleOfServerToken(req, res, LocalDateTime.now());
	}

	/**
	 * 닉네임 중복 검사
	 *
	 * @param nickname 닉네임
	 * @return MemberNicknameValidateResponseDto    닉네임 중복 검사 결과
	 */
	@Override
	public MemberNicknameValidateResponseDto validateMemberNickname(String nickname) {
		return memberQueryService.validateMemberNickname(nickname);
	}

	/**
	 * 내 정보 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @return MemberMyInfoResponseDto  내 정보
	 */
	@Override
	public MemberMyInfoResponseDto getMyInfo(UserSessionDto userSessionDto) {
		return memberQueryService.getMyInfo(userSessionDto.getMemberId());
	}

	/**
	 * 내 프로필 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @return MemberProfileResponseDto  내 프로필
	 */
	@Override
	public MemberProfileResponseDto getMyProfile(UserSessionDto userSessionDto) {
		return memberQueryService.getMyProfile(userSessionDto.getMemberId());
	}

	/**
	 * 멤버 프로필 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param memberId       멤버 아이디
	 * @return MemberProfileResponseDto  멤버 프로필
	 */
	@Override
	public MemberProfileResponseDto getMemberProfile(UserSessionDto userSessionDto, Long memberId) {
		return memberQueryService.getMemberProfile(userSessionDto.getMemberId(), memberId);
	}

	/**
	 * 멤버 프로필 변경
	 *
	 * @param userSessionDto                로그인한 유저의 세션 정보
	 * @param memberProfileChangeRequestDto 멤버 프로필 변경 요청 정보
	 * @return MemberProfileChangeResponseDto       멤버 프로필 변경 결과
	 */
	@Override
	public MemberProfileChangeResponseDto changeMemberProfile(
			UserSessionDto userSessionDto,
			MemberProfileChangeRequestDto memberProfileChangeRequestDto) {
		return memberService.changeMemberProfile(userSessionDto, memberProfileChangeRequestDto.getMemberName(),
				memberProfileChangeRequestDto.getProfileImageUrl(), memberProfileChangeRequestDto.getStatement(),
				memberProfileChangeRequestDto.isProfileImageChanged());
	}

	/**
	 * 내 게시글 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param pageable       페이지 정보
	 * @return BoardsResponseDto        내 게시글
	 */
	@Override
	public BoardsPaginationDto getMyBoards(UserSessionDto userSessionDto, PageRequest pageable) {
		return boardQueryService.getMemberBoards(userSessionDto.getMemberId(),
				userSessionDto.getMemberId(), pageable);
	}

	/**
	 * 멤버 게시글 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param memberId       멤버 아이디
	 * @param pageable       페이지 정보
	 * @return BoardsResponseDto        멤버 게시글
	 */
	@Override
	public BoardsPaginationDto getMemberBoards(UserSessionDto userSessionDto, Long memberId,
			PageRequest pageable) {
		return boardQueryService.getMemberBoards(userSessionDto.getMemberId(), memberId, pageable);
	}

	/**
	 * 멤버 검색
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param partialName    닉네임
	 * @param pageable       페이지 정보
	 * @return MemberSearchResponseDto  멤버 검색 결과
	 */
	@Override
	public MemberSearchPaginationDto searchMemberByName(UserSessionDto userSessionDto,
			String partialName, PageRequest pageable) {
		return memberQueryService.searchMemberByName(userSessionDto.getMemberId(), partialName,
				pageable);
	}

	/**
	 * 언어 변경
	 *
	 * @param userSession                    로그인한 유저의 세션 정보
	 * @param memberLanguageChangeRequestDto 언어 변경 요청 정보
	 */
	@Override
	public void changeLanguage(UserSessionDto userSession,
			MemberLanguageChangeRequestDto memberLanguageChangeRequestDto) {
		memberService.changeLanguage(userSession.getMemberId(),
				memberLanguageChangeRequestDto.getLanguage());
	}

	@Override
	public MemberProfileResponseDto getTaggingMember(UserSessionDto userSessionDto, String name) {
		return memberQueryService.getTaggingMember(userSessionDto.getMemberId(), name);
	}
}
