package proj.pet.follow.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.follow.domain.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

	@Query("SELECT f " +
			"FROM Follow f " +
			"WHERE f.from = :memberId " +
			"AND f.to = :targetMemberId")
	Optional<Follow> findByMemberCompositeKey(
			@Param("memberId") Long memberId, Long targetMemberId);

	@Query("SELECT f " +
			"FROM Follow f " +
			"LEFT JOIN FETCH f.to " +
			"WHERE f.from = :memberId")
	Page<Follow> findAllByFromWithMember(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT f " +
			"FROM Follow f " +
			"LEFT JOIN FETCH f.from " +
			"WHERE f.to = :memberId")
	Page<Follow> findAllByToWithMember(@Param("memberId") Long memberId, Pageable pageable);
}
