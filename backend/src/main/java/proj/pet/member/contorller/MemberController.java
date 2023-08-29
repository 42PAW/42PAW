package proj.pet.member.contorller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.*;
import proj.pet.member.service.MemberFacadeService;

import static proj.pet.auth.domain.AuthLevel.ANYONE;
import static proj.pet.auth.domain.AuthLevel.USER_OR_ADMIN;

@RestController
@RequestMapping("/v1/members")
@RequiredArgsConstructor
@Log4j2
public class MemberController {

	private final MemberFacadeService memberFacadeService;

	/**
	 * 회원 가입
	 *
	 * @param userSessionDto         로그인한 유저의 세션 정보
	 * @param req                    요청
	 * @param res                    응답
	 * @param memberCreateRequestDto 회원 가입 정보
	 */
	@PostMapping(consumes = "multipart/form-data")
	@AuthGuard(level = ANYONE)
	public void createMember(
			@UserSession UserSessionDto userSessionDto,
			HttpServletRequest req, HttpServletResponse res,
			@ModelAttribute MemberCreateRequestDto memberCreateRequestDto
	) {
		System.out.println("userSessionDto = " + userSessionDto);
		memberFacadeService.createMember(userSessionDto, req, res, memberCreateRequestDto);
	}

	/**
	 * 닉네임 중복 검사
	 *
	 * @param name 닉네임
	 * @return MemberNicknameValidateResponseDto    닉네임 중복 검사 결과
	 */
	@GetMapping("/valid")
	@AuthGuard(level = ANYONE)
	public MemberNicknameValidateResponseDto validateMemberNickname(
			@RequestParam("name") String name) {
		return memberFacadeService.validateMemberNickname(name);
	}

	/**
	 * 내 정보 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @return MemberMyInfoResponseDto  내 정보
	 */
	@GetMapping("/me")
	@AuthGuard(level = USER_OR_ADMIN)
	public MemberMyInfoResponseDto getMyInfo(@UserSession UserSessionDto userSessionDto) {
		return memberFacadeService.getMyInfo(userSessionDto);
	}

	/**
	 * 내 프로필 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @return MemberProfileResponseDto 내 프로필
	 */
	@GetMapping("/me/profile")
	@AuthGuard(level = USER_OR_ADMIN)
	public MemberProfileResponseDto getMyProfile(@UserSession UserSessionDto userSessionDto) {
		return memberFacadeService.getMyProfile(userSessionDto);
	}

	/**
	 * 멤버 프로필 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param memberId       멤버 아이디
	 * @return MemberProfileResponseDto 멤버 프로필
	 */
	@GetMapping("{memberId}/profile")
	@AuthGuard(level = ANYONE)
	public MemberProfileResponseDto getMemberProfile(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("memberId") Long memberId) {
		return memberFacadeService.getMemberProfile(userSessionDto, memberId);
	}

	/**
	 * 내 프로필 수정
	 *
	 * @param userSessionDto                로그인한 유저의 세션 정보
	 * @param memberProfileChangeRequestDto 수정할 프로필 정보
	 * @return MemberProfileChangeResponseDto   수정된 프로필 정보
	 */
	@PatchMapping("me/profile")
	@AuthGuard(level = USER_OR_ADMIN)
	public MemberProfileChangeResponseDto changeMyProfile(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody MemberProfileChangeRequestDto memberProfileChangeRequestDto) {
		return memberFacadeService.changeMemberProfile(userSessionDto,
				memberProfileChangeRequestDto);
	}

	/**
	 * 내가 작성한 게시글 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param page           페이지 번호
	 * @param size           페이지 사이즈
	 * @return BoardsResponseDto    게시글 목록
	 */
	@GetMapping("/me/boards")
	@AuthGuard(level = USER_OR_ADMIN)
	public BoardsPaginationDto getMyBoards(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		PageRequest pageable = PageRequest.of(page, size);
		return memberFacadeService.getMyBoards(userSessionDto, pageable);
	}

	/**
	 * 멤버가 작성한 게시글 조회
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param memberId       멤버 아이디
	 * @param page           페이지 번호
	 * @param size           페이지 사이즈
	 * @return BoardsResponseDto    게시글 목록
	 */
	@GetMapping("{memberId}/boards")
	@AuthGuard(level = ANYONE)
	public BoardsPaginationDto getMemberBoards(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable("memberId") Long memberId,
			@RequestParam("page") int page,
			@RequestParam("size") int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return memberFacadeService.getMemberBoards(userSessionDto, memberId, pageable);
	}

	/**
	 * 닉네임으로 멤버 검색
	 *
	 * @param userSessionDto 로그인한 유저의 세션 정보
	 * @param name           닉네임
	 * @param page           페이지 번호
	 * @param size           페이지 사이즈
	 * @return MemberSearchResponseDto  멤버 검색 결과
	 */
	@GetMapping("/search")
	@AuthGuard(level = ANYONE)
	public MemberSearchPaginationDto searchMemberByName(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("name") String name,
			@RequestParam("page") int page,
			@RequestParam("size") int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return memberFacadeService.searchMemberByName(userSessionDto, name, pageable);
	}

	/**
	 * 언어 변경
	 *
	 * @param userSessionDto                 로그인한 유저의 세션 정보
	 * @param memberLanguageChangeRequestDto 변경할 언어 정보
	 */
	@PatchMapping("/me/language")
	@AuthGuard(level = USER_OR_ADMIN)
	public void changeLanguage(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody MemberLanguageChangeRequestDto memberLanguageChangeRequestDto) {
		memberFacadeService.changeLanguage(userSessionDto, memberLanguageChangeRequestDto);
	}
}
