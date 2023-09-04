package proj.pet.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.category.dto.CategoryResponseDto;
import proj.pet.category.dto.CategoryUpdateRequestDto;
import proj.pet.category.service.CategoryFacadeService;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;

@RestController
@RequestMapping("/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryFacadeService categoryFacadeService;

	@GetMapping
	public CategoryResponseDto getCategories() {
		return categoryFacadeService.getCategories();
	}

	@PatchMapping("/members/me")
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void updateMyCategories(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody CategoryUpdateRequestDto categoryUpdateRequestDto
	) {
		categoryFacadeService.updateMyCategories(userSessionDto, categoryUpdateRequestDto);
	}
}
