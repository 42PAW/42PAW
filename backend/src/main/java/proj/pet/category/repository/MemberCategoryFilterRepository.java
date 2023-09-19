package proj.pet.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.category.domain.MemberCategoryFilter;

import java.util.List;

@Repository
public interface MemberCategoryFilterRepository extends
		JpaRepository<MemberCategoryFilter, Long> {

	@Query("SELECT mcf "
			+ "FROM MemberCategoryFilter mcf "
			+ "WHERE mcf.member.id = :memberId ")
	List<MemberCategoryFilter> findAllByMemberIdWithJoin(@Param("memberId") Long memberId);
}
