package proj.pet.scrap.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.scrap.dto.ScrapCreateRequestDto;
import proj.pet.scrap.service.ScrapFacadeService;

@RestController
@RequestMapping("/v2/scraps")
@RequiredArgsConstructor
public class ScrapControllerV2 {

	private final ScrapFacadeService scrapFacadeService;

	@GetMapping("/members/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public BoardsPaginationDto getMyScraps(
			@UserSession UserSessionDto userSessionDto,
			@RequestParam("page") int page,
			@RequestParam("size") int size
	) {
		PageRequest pageRequest = PageRequest.of(page, size);
		return scrapFacadeService.getMyScrapsRefactoring(userSessionDto, pageRequest);
	}

	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createScrap(
			@UserSession UserSessionDto userSessionDto,
			@Valid @RequestBody ScrapCreateRequestDto scrapCreateRequestDto
	) {
		scrapFacadeService.createScrap(userSessionDto, scrapCreateRequestDto);
	}

	@DeleteMapping("/boards/{boardId}")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void deleteScrap(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable Long boardId
	) {
		scrapFacadeService.deleteScrap(userSessionDto, boardId);
	}
}
