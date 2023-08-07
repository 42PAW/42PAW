package proj.pet.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.service.BoardFacadeService;
import proj.pet.category.domain.Species;
import proj.pet.member.dto.UserSession;
import proj.pet.member.repository.MemberRepository;

import java.util.List;

import static proj.pet.member.domain.MemberRole.USER;

@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardController {

	private final BoardFacadeService boardFacadeService;
	// REMOVE
	private final MemberRepository memberRepository;

	@GetMapping
	public BoardsResponseDto getMainViewBoards(
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMainViewBoards(pageRequest);
	}

	@GetMapping("/hot")
	public BoardsResponseDto getHotBoards(
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getHotBoards(pageRequest);
	}

	@GetMapping("/members/{memberId}")
	public BoardsResponseDto getMemberBoards(
			@RequestParam("size") int size,
			@RequestParam("page") int page,
			@PathVariable("memberId") Long memberId) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return boardFacadeService.getMemberBoards(pageRequest, memberId);
	}

	@PostMapping(
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	)
	public void createBoard(
//			UserSession userSession,
			@RequestPart(value = "mediaDataList") List<MultipartFile> mediaDataList,
			@RequestPart(value = "categoryList") List<Species> categoryList,
			@RequestPart(value = "content") String content) {
		// TODO: userSession 시큐리티에서 가져오기
		System.out.println("HELLO!");
		System.out.println("memberRepository.findAll() = " + memberRepository.findAll());
		UserSession userSession = new UserSession(1L, "sanan", USER);
		boardFacadeService.createBoard(userSession, mediaDataList, categoryList, content);
	}

	@DeleteMapping("/{boardId}")
	public void deleteBoard(
			UserSession userSession,
			@PathVariable("boardId") Long boardId) {
		boardFacadeService.deleteBoard(userSession, boardId);
	}

	@PostMapping(
			value = "/test",
			consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	)
	public void test(
			@RequestPart(value = "mediaDataList") List<MultipartFile> mediaDataList,
			@RequestPart(value = "categoryList") List<Species> categoryList,
			@RequestPart(value = "content") String content
	) {
		System.out.println("mediaDtos = " + mediaDataList + "\n categoryList = " + categoryList + "\n content = " + content);
//		System.out.println("mediaDtos = " + mediaDataList + "\n categoryList = " + "\n content = " + content);
	}
}
