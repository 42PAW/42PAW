package proj.pet.category.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.category.domain.BoardCategoryFilter;

@Repository
public interface BoardCategoryFilterRepository extends
		JpaRepository<BoardCategoryFilter, Long> {

	@Query("SELECT bcf "
			+ "FROM BoardCategoryFilter bcf "
			+ "LEFT JOIN FETCH bcf.board "
			+ "WHERE bcf.board.id = :boardId ")
	List<BoardCategoryFilter> findAllByBoardIdWithJoin(@Param("boardId") Long boardId);
}
