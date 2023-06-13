package proj.pet.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.category.domain.AnimalCategory;

@Repository
public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, Long> {

	AnimalCategory findById(long id);
}
