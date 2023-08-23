package proj.pet.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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
	public void updateMyCategories(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody CategoryUpdateRequestDto categoryUpdateRequestDto
	) {
		categoryFacadeService.updateMyCategories(userSessionDto, categoryUpdateRequestDto);
	}

	@PatchMapping("/boards/{boardId}")
	public void updateBoardCategories(
			@UserSession UserSessionDto userSessionDto,
			@PathVariable Long boardId,
			@RequestBody CategoryUpdateRequestDto categoryUpdateRequestDto
	) {
		categoryFacadeService.updateBoardCategories(userSessionDto, boardId, categoryUpdateRequestDto);
	}
}
