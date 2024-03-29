package proj.pet.notice.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.springframework.beans.factory.annotation.Autowired;
import proj.pet.notice.repository.NoticeRepository;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;

@Disabled
public class NoticeEventHandlerTest extends E2ETest {
	private PersistHelper persistHelper;
	@Autowired
	private NoticeEventPublisher noticeEventPublisher;
	@Autowired
	private NoticeRepository noticeRepository;

	@BeforeEach
	void setUp() {
		persistHelper = PersistHelper.start(em);
	}

//	@DisplayName("NoticeEvent가 Publish되면 Notice가 생성된다.")
//	@Disabled("일단 동작은 하지만 원인 불명의 이유로 테스트 DB 셧다운이 되지 않아 실패함.")
//	@Test
//	void handleEvent() {
//		//given
//
//		Member member = TestMember.builder()
//				.oauthId("131541")
//				.nickname("sanan")
//				.build().asEntity();
//		Member follower = TestMember.builder()
//				.oauthId("134783147")
//				.nickname("jpark2")
//				.build().asEntity();
//		persistHelper.persist(member, follower).flushAndClear();
//
//		//when
//		noticeEventPublisher.publish("이것은 알림 제목이랍니다",
//				member.getId(),
//				NoticeFormat.of("{}님이 {}님을 팔로우합니다!"),
//				follower, member);
//
//		//then
//		Notice notice = noticeRepository.findById(1L).get();
//		Assertions.assertThat(notice.getTitle()).isEqualTo("이것은 알림 제목이랍니다");
//		Assertions.assertThat(notice.getReceiverId()).isEqualTo(member.getId());
//		Assertions.assertThat(notice.getFormat()).isEqualTo("{}님이 {}님을 팔로우합니다!");
//		Assertions.assertThat(notice.getParameters()).isEqualTo("{MBR/2/jpark2},{MBR/1/sanan}");
//	}
}
