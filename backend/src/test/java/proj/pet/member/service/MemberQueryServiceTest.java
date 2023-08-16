package proj.pet.member.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardRepository;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.member.domain.*;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;

import static org.mockito.Mockito.mock;

@SpringBootTest
@Transactional
class MemberQueryServiceTest {

	@Autowired
	private MemberQueryService memberQueryService;
	@Autowired
	private EntityManager em;
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private BoardRepository boardRepository;
	private FollowRepository followRepository;

	@BeforeEach
	void setUp() {
		followRepository = mock(FollowRepository.class);
	}

	@Test
	void getMyProfile() {
		// given
		LocalDateTime now = LocalDateTime.now();
		Member member = memberRepository.save(stubMember("jpark2", MemberRole.USER, now));
		for (int i = 0; i < 10; i++) {
			boardRepository.save(Board.of(
					member,
					VisibleScope.PUBLIC,
					"location",
					now.minusMinutes(10 - i)
			));
		}
		em.flush();
		em.clear();

		// when
//		MemberMyProfileResponseDto result = memberQueryService.getMemberProfile( member.getId());

		// then
//		assertThat(result.getMemberName()).isEqualTo("jpark2");
//		assertThat(result.getIntraName()).isEqualTo("oauthName");
//		assertThat(result.getFollowingCount()).isEqualTo(0L);
//		assertThat(result.getFollowerCount()).isEqualTo(0L);
//		assertThat(result.getBoardCount()).isEqualTo(10);
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