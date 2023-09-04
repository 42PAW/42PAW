package proj.pet.member.domain;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.domain.Country.Campus;
import proj.pet.member.repository.MemberRepository;

@SpringBootTest
@Transactional
class MemberTest {

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	BoardRepository boardRepository;

	@Autowired
	EntityManager em;

	@BeforeEach
	void setUp() {
		System.out.println("setup start");
		Member member = Member.of(OauthProfile.of(OauthType.FORTY_TWO, "1", "user"),
				Country.KOREA, Campus.SEOUL, "nickname", "statement", MemberRole.USER,
				LocalDateTime.now());
		memberRepository.save(member);
		Board board = Board.of(member, VisibleScope.PUBLIC, "content", LocalDateTime.now());
		boardRepository.save(board);
	}

	@Test
	void test() {
		em.clear();
		System.out.println("test start");
		Optional<Board> board = boardRepository.findById(1L);
		System.out.println("query end");
		Member member = board.get().getMember();
		System.out.println("board end");
		System.out.println(member.getId());
		System.out.println("test end");
	}
}