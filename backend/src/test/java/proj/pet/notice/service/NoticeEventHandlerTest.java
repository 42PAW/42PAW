package proj.pet.notice.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import proj.pet.member.domain.Member;
import proj.pet.notice.domain.Notice;
import proj.pet.notice.domain.NoticeFormat;
import proj.pet.notice.repository.NoticeRepository;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.member.TestMember;

public class NoticeEventHandlerTest extends E2ETest {
	private PersistHelper persistHelper;
	@Autowired
	private NoticeEventPublisher noticeEventPublisher;
	@Autowired
	private NoticeEventHandler noticeEventHandler;
	@Autowired
	private NoticeRepository noticeRepository;

	@DisplayName("NoticeEvent가 Publish되면 Notice가 생성된다.")
	@Test
	void handleEvent() {
		//given
		persistHelper = PersistHelper.start(em);
		Member member = TestMember.builder()
				.oauthId("131541")
				.nickname("sanan")
				.build().asEntity();
		Member follower = TestMember.builder()
				.oauthId("134783147")
				.nickname("jpark2")
				.build().asEntity();
		persistHelper.persist(member, follower).flushAndClear();

		//when
		noticeEventPublisher.publish("이것은 알림 제목이랍니다",
				member.getId(),
				NoticeFormat.of("{}님이 {}님을 팔로우합니다!"),
				follower, member);

		//then
		Notice notice = noticeRepository.findById(1L).get();
		Assertions.assertThat(notice.getTitle()).isEqualTo("이것은 알림 제목이랍니다");
		Assertions.assertThat(notice.getReceiverId()).isEqualTo(member.getId());
		Assertions.assertThat(notice.getFormat()).isEqualTo("{}님이 {}님을 팔로우합니다!");
		Assertions.assertThat(notice.getParameters()).isEqualTo("{MBR/2/jpark2},{MBR/1/sanan}");
	}
}
