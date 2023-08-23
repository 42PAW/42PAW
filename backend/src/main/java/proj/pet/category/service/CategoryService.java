package proj.pet.category.service;

import proj.pet.category.domain.Species;

import java.util.List;

public interface CategoryService {
	void updateMemberCategories(Long memberId, List<Species> speciesList);

	void updateBoardCategories(Long memberId, Long boardId, List<Species> speciesList);
}
