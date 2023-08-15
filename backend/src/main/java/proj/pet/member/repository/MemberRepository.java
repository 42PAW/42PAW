package proj.pet.member.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	/**
	 * oauthName으로 Member를 찾는다.
	 *
	 * @param oauthName 42 인트라 아이디
	 * @return Optional<Member> oauthName으로 찾은 Member
	 */
	@Query("SELECT m " +
			"FROM Member m " +
			"WHERE m.oauthProfile.name = :oauthName")
	Optional<Member> findByOauthName(@Param("oauthName") String oauthName);

	/**
	 * nickname으로 Member를 찾는다.
	 *
	 * @param nickname 닉네임
	 * @return Optional<Member> nickname으로 찾은 Member
	 */
	Optional<Member> findByNickname(String nickname);

	/**
	 * nickname의 일부분으로 해당 이름을 포함하고 있는 모든 Member를 찾는다.
	 *
	 * @param partialName 닉네임 일부분
	 * @return Page<Member> nickname을 포함하는 Member들
	 */
	Page<Member> findByNicknameContaining(String partialName, PageRequest pageable);
}
