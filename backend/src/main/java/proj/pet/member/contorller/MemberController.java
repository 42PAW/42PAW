package proj.pet.member.contorller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
import proj.pet.member.service.MemberFacadeService;

@RestController
@RequestMapping("/v1/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberFacadeService memberFacadeService;

	@PostMapping("/")
	public void createMember(@RequestBody MemberCreateRequestDto memberCreateRequestDto) {
		memberFacadeService.createMember(memberCreateRequestDto);
	}

	@GetMapping("/valid")
	public MemberNicknameValidateResponseDto validateMemberNickname(
			@RequestParam("name") String name) {
		return memberFacadeService.validateMemberNickname(name);
	}

	@GetMapping("me")
	public MemberMyInfoResponseDto getMyInfo() {
		//TODO: user 세션에서 가져오기
//		return memberFacadeService.getMyInfo();
		return null;
	}

	@GetMapping("me/profile")
	public MemberMyProfileResponseDto getMyProfile() {
		//TODO: user 세션에서 가져오기
//		return memberFacadeService.getMyProfile();
		return null;
	}

	@PatchMapping("me/profile")
	public MemberProfileChangeResponseDto changeMyProfile(
			@RequestBody MemberProfileChangeRequestDto memberProfileChangeRequestDto) {
		//TODO: user 세션에서 가져오기
//		return memberFacadeService.changeMemberProfile(memberProfileChangeRequestDto);
		return null;
	}

	@GetMapping("{memberId}/preview")
	public MemberPreviewResponseDto getMemberPreview(@PathVariable("memberId") Long memberId) {
		return memberFacadeService.getMemberPreview(memberId);
	}

	@GetMapping("/me/boards")
	public BoardsResponseDto getMyBoards(
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		//TODO: user id 세션에서 가져오기
//		return memberFacadeService.getMyBoards(, page, size);
		return null;
	}

	@GetMapping("{memberId}/boards")
	public BoardsResponseDto getMemberBoards(
			@PathVariable("memberId") Long memberId,
			@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return memberFacadeService.getMemberBoards(memberId, page, size);
	}

	@GetMapping("/search")
	public MemberSearchResponseDto searchMemberByName(
			@RequestParam("name") String name,
			@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return memberFacadeService.searchMemberByName(name, page, size);
	}

	@PatchMapping("/me/language")
	public void changeLanguage(
			@RequestBody MemberLanguageChangeRequestDto memberLanguageChangeRequestDto) {
		//TODO: user 세션에서 가져오기
//		memberFacadeService.changeLanguage(userSession, memberLanguageChangeRequestDto);
	}
}
