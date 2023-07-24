package proj.pet.category.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.category.dto.CategoryResponseDto;
import proj.pet.category.service.CategoryFacadeService;

@RestController("/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryFacadeService categoryFacadeService;

	@GetMapping("/")
	public CategoryResponseDto getCategories() {
		return categoryFacadeService.getCategories();
	}
}
