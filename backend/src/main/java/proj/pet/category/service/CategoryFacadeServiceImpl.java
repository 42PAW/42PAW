package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.category.dto.CategoryUpdateRequestDto;
import proj.pet.member.dto.UserSessionDto;

@Service
@RequiredArgsConstructor
public class CategoryFacadeServiceImpl implements CategoryFacadeService {

	private final CategoryService categoryService;

	@Override
	public void updateMyCategories(UserSessionDto userSessionDto,
	                               CategoryUpdateRequestDto categoryUpdateRequestDto) {
		categoryService.updateMemberCategories(userSessionDto.getMemberId(),
				categoryUpdateRequestDto.getCategories());
	}
}
