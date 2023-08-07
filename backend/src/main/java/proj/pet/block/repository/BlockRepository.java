package proj.pet.block.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.block.domain.Block;
import proj.pet.utils.domain.MemberCompositeKey;

import java.util.Optional;

@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {

	@Query("SELECT b " +
			"FROM Block b " +
			"WHERE b.from = :memberId " +
			"AND b.to = :targetMemberId")
	Optional<Block> findByMemberCompositeKey(@Param("memberId") Long memberId, @Param("targetMemberId") Long targetMemberId);

	@Query("SELECT b " +
			"FROM Block b " +
			"WHERE b.id = :memberCompositeKey")
	void deleteByCompositeKey(@Param("memberCompositeKey") MemberCompositeKey memberCompositeKey);

	@Query("SELECT b " +
			"FROM Block b " +
			"WHERE b.from = :memberId")
	Page<Block> findAllByMemberId(@Param("memberId") Long memberId, Pageable pageable);
}
