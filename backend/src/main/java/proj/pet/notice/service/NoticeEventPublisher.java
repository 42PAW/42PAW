package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import proj.pet.notice.domain.EntityAdaptor;
import proj.pet.notice.domain.NoticeEvent;
import proj.pet.notice.domain.NoticeFormat;
import proj.pet.utils.domain.IdDomain;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class NoticeEventPublisher {
	private final ApplicationEventPublisher eventPublisher;
	private final EntityAdaptor entityAdaptor;

	@SafeVarargs public final <T extends IdDomain<?>> void publish(String title, Long receiverId, NoticeFormat format, T... entities) {
		NoticeEvent event = NoticeEvent.of(title, format, entityAdaptor.adapt(Arrays.stream(entities).toList()), receiverId);
		eventPublisher.publishEvent(event);
	}
}
