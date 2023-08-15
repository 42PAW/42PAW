package proj.pet.scrap.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.domain.*;
import proj.pet.member.repository.MemberRepository;
import proj.pet.scrap.domain.Scrap;
import proj.pet.scrap.repository.ScrapRepository;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class ScrapServiceTest {

	@Autowired
	private EntityManager em;

	@Autowired
	private ScrapService scrapService;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private ScrapRepository scrapRepository;

	@Autowired
	private BoardRepository boardRepository;

	@DisplayName("사용자는 특정 게시글을 스크랩 할 수 있다.")
	@Test
	void createScrap() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member author = memberRepository.save(stubMember("nickname", MemberRole.USER, now));
		Member loginUser = memberRepository.save(stubMember("loginUser", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(author, VisibleScope.PUBLIC, "content", now));
		em.flush();
		em.clear();

		//when
		scrapService.createScrap(loginUser.getId(), board.getId());
		em.flush();
		em.clear();

		//then
		Scrap result = scrapRepository.findByMemberAndBoardId(loginUser.getId(), board.getId()).get();
		assertThat(result).isNotNull();
		assertThat(result.getMemberId()).isEqualTo(loginUser.getId());
		assertThat(result.getBoardId()).isEqualTo(board.getId());
	}

	@DisplayName("사용자는 본인이 스크랩한 게시글을 스크랩 취소할 수 있다.")
	@Test
	void deleteScrap() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member author = memberRepository.save(stubMember("nickname", MemberRole.USER, now));
		Member loginUser = memberRepository.save(stubMember("loginUser", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(author, VisibleScope.PUBLIC, "content", now));
		Scrap scrap = scrapRepository.save(Scrap.of(loginUser, board, now));
		em.flush();
		em.clear();

		//when
		scrapService.deleteScrap(loginUser.getId(), board.getId());
		em.flush();
		em.clear();

		//then
		assertThat(scrapRepository.findByMemberAndBoardId(loginUser.getId(), board.getId())).isEmpty();
	}

	private Member stubMember(String nickname, MemberRole memberRole, LocalDateTime now) {
		OauthProfile oauthProfile = OauthProfile.of(OauthType.FORTY_TWO, "oauthId", "oauthName");
		return Member.of(oauthProfile,
				Country.KOREA,
				nickname,
				"statement",
				memberRole,
				now);
	}
}