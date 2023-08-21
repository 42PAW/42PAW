package proj.pet.follow.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.follow.domain.Follow;
import proj.pet.utils.domain.MemberCompositeKey;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, MemberCompositeKey> {

	/**
	 * 팔로우 하는 사람과 팔로우 받는 사람의 id를 받아 팔로우를 찾는다.
	 * <br>
	 * CompositeKey를 사용하기 위해 Query를 사용
	 *
	 * @param memberId       팔로우 하는 사람의 id
	 * @param targetMemberId 팔로우 받는 사람의 id
	 * @return Optional<Follow> 팔로우 반환
	 */
//	@Query("SELECT f " +
//			"FROM Follow f " +
//			"WHERE f.from = :memberId " +
//			"AND f.to = :targetMemberId")
//	Optional<Follow> findByMemberCompositeKey(
//			@Param("memberId") Long memberId, @Param("targetMemberId") Long targetMemberId);

	/**
	 * 팔로우 하는 사람의 id를 받아 팔로우를 찾는다.
	 * <br>
	 * 팔로우 받는 사람의 정보를 같이 가져오기 위해 LEFT JOIN FETCH 사용
	 *
	 * @param memberId 팔로우 하는 사람의 id
	 * @param pageable 페이징 정보
	 * @return Page<Follow> 팔로우 페이징 반환
	 */
	@Query("SELECT f " +
			"FROM Follow f " +
			"LEFT JOIN FETCH f.to " +
			"WHERE f.from = :memberId")
	Page<Follow> findAllByFromWithMember(@Param("memberId") Long memberId, Pageable pageable);

	/**
	 * 팔로우 받는 사람의 id를 받아 팔로우를 찾는다.
	 * <br>
	 * 팔로우 하는 사람의 정보를 같이 가져오기 위해 LEFT JOIN FETCH 사용
	 *
	 * @param memberId 팔로우 받는 사람의 id
	 * @param pageable 페이징 정보
	 * @return Page<Follow> 팔로우 페이징 반환
	 */
	@Query("SELECT f " +
			"FROM Follow f " +
			"LEFT JOIN FETCH f.from " +
			"WHERE f.to = :memberId")
	Page<Follow> findAllByToWithMember(@Param("memberId") Long memberId, Pageable pageable);

	/**
	 * id를 받아 해당 멤버가 몇 명을 팔로우 하고 있는지를 반환한다.
	 *
	 * @param memberId 팔로우 하는 사람의 id
	 * @return long 팔로우 하는 사람 수 반환
	 */
	@Query("SELECT COUNT(f) " +
			"FROM Follow f " +
			"WHERE f.to.id = :memberId")
	long countByFollowerId(@Param("memberId") Long memberId);

	/**
	 * id를 받아 해당 멤버를 몇 명이 팔로우 하고 있는지를 반환한다.
	 *
	 * @param memberId 팔로우 받는 사람의 id
	 * @return long 팔로우 받는 사람 수 반환
	 */
	@Query("SELECT COUNT(f) " +
			"FROM Follow f " +
			"WHERE f.from.id = :memberId")
	int countByFollowingId(@Param("memberId") Long memberId);

	/**
	 * 팔로우 하는 사람과 팔로우 받는 사람의 id를 받아 팔로우가 존재하는지 확인한다.
	 *
	 * @param fromId 팔로우 하는 사람의 id
	 * @param toId   팔로우 받는 사람의 id
	 * @return boolean 팔로우 여부 반환
	 */
	boolean existsByFromIdAndToId(Long fromId, Long toId);
}
