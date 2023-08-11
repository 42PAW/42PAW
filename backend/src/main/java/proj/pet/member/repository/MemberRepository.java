package proj.pet.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.member.domain.Member;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	@Query("SELECT m " +
			"FROM Member m " +
			"WHERE m.oauthProfile.name = :oauthName")
	Optional<Member> findByOauthName(@Param("oauthName") String oauthName);
}
