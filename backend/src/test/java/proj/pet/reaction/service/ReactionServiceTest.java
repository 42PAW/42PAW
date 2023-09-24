package proj.pet.reaction.service;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.Member;
import proj.pet.member.domain.MemberRole;
import proj.pet.member.domain.OauthProfile;
import proj.pet.member.domain.OauthType;
import proj.pet.member.repository.MemberRepository;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.reaction.repository.ReactionRepository;

@SpringBootTest
@Transactional
@Disabled("옛날 테스트")
class ReactionServiceTest {

	@Autowired
	private EntityManager em;

	@Autowired
	private ReactionService reactionService;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private ReactionRepository reactionRepository;


	@DisplayName("사용자는 게시글에 리액션 할 수 있다.")
	@Test
	void createReaction() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member member = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(member, VisibleScope.PUBLIC, "글의 내용", now));
		em.flush();
		em.clear();

		//when
		reactionService.createReaction(member.getId(), board.getId(), ReactionType.LIKE);

		//then
		Reaction reaction = reactionRepository.findById(1L).get();
		assertThat(reaction.getMember().getId()).isEqualTo(member.getId());
		assertThat(reaction.getBoard().getId()).isEqualTo(board.getId()); // todo getMemberId 등으로 변경
		assertThat(reaction.getReactionType()).isEqualTo(ReactionType.LIKE);
	}

	@DisplayName("사용자는 게시글에 대한 리액션을 삭제할 수 있다.")
	@Test
	void deleteReaction() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member member = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(member, VisibleScope.PUBLIC, "글의 내용", now));
		Reaction reaction = reactionRepository.save(
				Reaction.of(board, member, ReactionType.LIKE, now));
		em.flush();
		em.clear();

		//when
		reactionService.deleteReaction(member.getId(), board.getId());

		//then
		assertThat(reactionRepository.findById(reaction.getId())).isEmpty();
	}

	private Member stubMember(String nickname, MemberRole memberRole, LocalDateTime now) {
		OauthProfile oauthProfile = OauthProfile.of(OauthType.FORTY_TWO, "oauthId", "oauthName");
		return Member.of(oauthProfile,
				Country.KOREA,
				Country.Campus.SEOUL,
				nickname,
				"statement",
				memberRole,
				now);
	}
}