package proj.pet.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}
