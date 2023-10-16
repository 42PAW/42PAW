package proj.pet.reaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.reaction.domain.Reaction;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {
	@Query("SELECT r " +
			"FROM Reaction r " +
			"WHERE r.board.id = :boardId AND r.member.id = :memberId")
	Optional<Reaction> findByBoardAndMember(@Param("boardId") Long boardId, @Param("memberId") Long memberId);

	@Query("SELECT COUNT(r) " +
			"FROM Reaction r " +
			"WHERE r.board.id = :boardId")
	Long countByBoardId(Long boardId);
}
