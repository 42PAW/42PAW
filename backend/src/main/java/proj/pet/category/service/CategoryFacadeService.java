package proj.pet.category.service;

import proj.pet.category.dto.CategoryUpdateRequestDto;
import proj.pet.member.dto.UserSessionDto;

public interface CategoryFacadeService {

	void updateMyCategories(UserSessionDto userSessionDto,
	                        CategoryUpdateRequestDto categoryUpdateRequestDto);
}
