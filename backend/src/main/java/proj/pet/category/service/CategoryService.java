package proj.pet.category.service;

import java.util.List;
import proj.pet.category.domain.Species;

public interface CategoryService {

	void updateMemberCategories(Long memberId, List<Species> speciesList);
}
