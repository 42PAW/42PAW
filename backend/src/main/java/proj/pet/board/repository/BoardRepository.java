package proj.pet.board.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proj.pet.board.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {

	@Query("SELECT b "
			+ "FROM Board b "
			+ "ORDER BY b.createdAt DESC")
	Page<Board> finaAllOrderByCreatedAtDesc(PageRequest pageRequest);

	@Query("SELECT b "
			+ "FROM Board b "
			+ "ORDER BY count(b.reactions) DESC, b.createdAt DESC")
	Page<Board> findAllOrderByReactionCountDesc(PageRequest pageRequest);
}
