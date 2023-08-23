package proj.pet.category.service;

import proj.pet.category.dto.CategoryResponseDto;
import proj.pet.category.dto.CategoryUpdateRequestDto;
import proj.pet.member.dto.UserSessionDto;

public interface CategoryFacadeService {

	CategoryResponseDto getCategories();

	void updateMyCategories(UserSessionDto userSessionDto, CategoryUpdateRequestDto categoryUpdateRequestDto);

	void updateBoardCategories(UserSessionDto userSessionDto, Long boardId, CategoryUpdateRequestDto categoryUpdateRequestDto);
}
