package proj.pet.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.utils.domain.ConsumptionCompositeKey;

@Repository
public interface BoardCategoryFilterRepository extends JpaRepository<BoardCategoryFilter, ConsumptionCompositeKey> {
}
