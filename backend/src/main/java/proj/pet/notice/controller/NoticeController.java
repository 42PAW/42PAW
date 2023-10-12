package proj.pet.notice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.notice.dto.NoticeReadRequestDto;
import proj.pet.notice.dto.NoticeResponseDto;
import proj.pet.notice.service.NoticeEventTestService;
import proj.pet.notice.service.NoticeFacadeService;

@RestController
@RequestMapping("/v1/notices")
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeFacadeService noticeFacadeService;
	//test
	private final NoticeEventTestService noticeEventTestService;

	@GetMapping("/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public NoticeResponseDto getMyNotice(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return noticeFacadeService.getMyNotice(userSessionDto, pageRequest);
	}

	/**
	 * 읽지 않은 알림들을 조회합니다.
	 *
	 * @param userSessionDto
	 * @return 읽지 않은 알림들
	 */
	@GetMapping("/me/unread")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public NoticeResponseDto getUnreadNotice(
			@UserSession UserSessionDto userSessionDto
	) {
		return noticeFacadeService.getUnreadNotice(userSessionDto);
	}

	@PostMapping("/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void readNotice(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody NoticeReadRequestDto noticeReadRequestDto) {
		noticeFacadeService.readNotice(userSessionDto, noticeReadRequestDto);
	}

	@GetMapping("/test")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public String noticeEventTest(
			@UserSession UserSessionDto userSessionDto) {
		noticeEventTestService.publish(userSessionDto);
		return "test!";
	}
}
