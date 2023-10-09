package proj.pet.notice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.notice.dto.NoticeResponseDto;
import proj.pet.notice.service.NoticeFacadeService;

@RestController
@RequestMapping("/v1/notices")
@RequiredArgsConstructor
public class NoticeController {

	private final NoticeFacadeService noticeFacadeService;

	@GetMapping("/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public NoticeResponseDto getMyNotice(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("size") int size,
			@RequestParam("page") int page) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return noticeFacadeService.getMyNotice(userSessionDto, pageRequest);
	}
}
