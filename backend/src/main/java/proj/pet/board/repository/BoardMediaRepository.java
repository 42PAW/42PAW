package proj.pet.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.board.domain.BoardMedia;

@Repository
public interface BoardMediaRepository extends JpaRepository<BoardMedia, Long> {
}
