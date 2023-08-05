package proj.pet.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.Species;

import java.util.List;

@Repository
public interface AnimalCategoryRepository extends JpaRepository<AnimalCategory, Long> {

	AnimalCategory findById(long id);

	@Query("SELECT ac " +
			"FROM AnimalCategory ac " +
			"WHERE ac.species IN :speciesList")
	List<AnimalCategory> findBySpeciesIn(@Param("speciesList") List<Species> speciesList);
}
