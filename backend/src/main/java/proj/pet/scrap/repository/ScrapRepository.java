package proj.pet.scrap.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.scrap.domain.Scrap;

import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {


	@Query("select s " +
			"from Scrap s " +
			"where s.memberId = :memberId and s.boardId = :boardId")
	Optional<Scrap> findByMemberAndBoardId(@Param("memberId") Long memberId, @Param("boardId") Long boardId);
}
