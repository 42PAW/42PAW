package proj.pet.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.board.domain.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
