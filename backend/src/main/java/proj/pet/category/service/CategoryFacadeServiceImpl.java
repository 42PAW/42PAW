package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.category.dto.CategoryResponseDto;

@Service
@RequiredArgsConstructor
public class CategoryFacadeServiceImpl implements CategoryFacadeService {

	private final CategoryQueryService categoryQueryService;

	@Override
	public CategoryResponseDto getCategories() {
		return categoryQueryService.getAllCategories();
	}
}
