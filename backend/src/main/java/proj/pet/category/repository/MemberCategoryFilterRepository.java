package proj.pet.category.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.utils.domain.ConsumptionCompositeKey;

@Repository
public interface MemberCategoryFilterRepository extends
		JpaRepository<MemberCategoryFilter, ConsumptionCompositeKey> {

	@Query("SELECT mcf "
			+ "FROM MemberCategoryFilter mcf "
			+ "LEFT JOIN FETCH mcf.animalCategory "
			+ "WHERE mcf.member.id = :memberId ")
	List<MemberCategoryFilter> findAllByMemberIdWithJoin(@Param("memberId") Long memberId);

	@Query("SELECT mcf "
			+ "FROM MemberCategoryFilter mcf "
			+ "LEFT JOIN FETCH mcf.animalCategory "
			+ "WHERE mcf.animalCategory.id = :animalCategoryId")
	List<MemberCategoryFilter> findAllByAnimalCategoryIdWithJoin(
			@Param("animalCategoryId") Long animalCategoryId);
}
