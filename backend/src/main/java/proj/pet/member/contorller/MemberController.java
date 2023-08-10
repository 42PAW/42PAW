package proj.pet.member.contorller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.member.dto.*;
import proj.pet.member.service.MemberFacadeService;

import java.io.IOException;
import java.util.List;

import static proj.pet.auth.domain.AuthLevel.USER_OR_ADMIN;

@RestController
@RequestMapping("/v1/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberFacadeService memberFacadeService;

	@PostMapping(consumes = "multipart/form-data")
	public void createMember(
			HttpServletRequest req, HttpServletResponse res,
			@RequestPart("memberName") String memberName,
			@RequestPart("imageData") MultipartFile imageData,
			@RequestPart("statement") String statement,
			@RequestPart("categoryFilters") List<AnimalCategory> categoryFilters
	) {
		memberFacadeService.createMember(req, res, new MemberCreateRequestDto(memberName, imageData, statement, categoryFilters));
	}

	@GetMapping("/valid")
	public MemberNicknameValidateResponseDto validateMemberNickname(
			@RequestParam("name") String name) {
		return memberFacadeService.validateMemberNickname(name);
	}

	@GetMapping("/me")
	@AuthGuard(level = USER_OR_ADMIN)
	public String getMyInfo(HttpServletResponse response) throws IOException {
		//TODO: user 세션에서 가져오기
		System.out.println("getMyInfo");
//		response.sendRedirect("http://naver.com");
//		return memberFacadeService.getMyInfo();
		return "hello";
	}

	@GetMapping("/me/profile")
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
