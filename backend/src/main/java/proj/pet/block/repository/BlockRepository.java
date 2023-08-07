package proj.pet.block.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proj.pet.block.domain.Block;
import proj.pet.utils.domain.MemberCompositeKey;

@Repository
public interface BlockRepository extends JpaRepository<Block, Long> {

	@Query("SELECT b " +
			"FROM Block b " +
			"WHERE b.from = :memberId " +
			"AND b.to = :targetMemberId")
	Optional<Block> findByMemberCompositeKey(Long memberId, Long targetMemberId);

	@Query("SELECT b " +
			"FROM Block b " +
			"WHERE b.id = :memberCompositeKey")
	void deleteByCompositeKey(MemberCompositeKey memberCompositeKey);

	@Query("SELECT b " +
			"FROM Block b " +
			"WHERE b.from = :memberId")
	Page<Block> findAllByMemberId(Long memberId, Pageable pageable);
}
