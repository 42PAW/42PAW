package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import proj.pet.notice.domain.NoticeEvent;
import proj.pet.notice.repository.NoticeRepository;

@Component
@RequiredArgsConstructor
public class NoticeEventHandler {
	private final NoticeRepository noticeRepository;

	@EventListener(NoticeEvent.class)
	public void handle(NoticeEvent event) {
		noticeRepository.save(event.toNotice());
	}
}
