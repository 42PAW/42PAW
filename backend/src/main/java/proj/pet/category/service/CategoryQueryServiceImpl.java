package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.Species;
import proj.pet.category.dto.CategoryResponseDto;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.utils.annotations.QueryService;

import java.util.List;

@QueryService
@RequiredArgsConstructor
public class CategoryQueryServiceImpl implements CategoryQueryService {

	private final AnimalCategoryRepository animalCategoryRepository;

	@Override public CategoryResponseDto getAllCategories() {
		List<Species> result = animalCategoryRepository.findAll().stream()
				.map(AnimalCategory::getSpecies)
				.toList();
		return new CategoryResponseDto(result);
	}
}
