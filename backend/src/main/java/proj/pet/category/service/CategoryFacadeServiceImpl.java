package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.category.dto.CategoryResponseDto;
import proj.pet.category.dto.CategoryUpdateRequestDto;
import proj.pet.member.dto.UserSessionDto;

@Service
@RequiredArgsConstructor
public class CategoryFacadeServiceImpl implements CategoryFacadeService {

	private final CategoryQueryService categoryQueryService;
	private final CategoryService categoryService;

	@Override
	public CategoryResponseDto getCategories() {
		return categoryQueryService.getAllCategories();
	}

	@Override
	public void updateMyCategories(UserSessionDto userSessionDto,
			CategoryUpdateRequestDto categoryUpdateRequestDto) {
		categoryService.updateMemberCategories(userSessionDto.getMemberId(),
				categoryUpdateRequestDto.getCategories());
	}
}
