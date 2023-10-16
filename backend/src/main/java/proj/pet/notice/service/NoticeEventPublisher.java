package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import proj.pet.exception.DomainException;
import proj.pet.notice.domain.EntityAdaptor;
import proj.pet.notice.domain.NoticeEvent;
import proj.pet.notice.domain.NoticeParameter;
import proj.pet.notice.domain.NoticeType;
import proj.pet.utils.domain.IdDomain;

import java.util.Arrays;
import java.util.List;

import static proj.pet.exception.ExceptionStatus.INVARIANT_VIOLENCE;

@Component
@RequiredArgsConstructor
public class NoticeEventPublisher {
	private final ApplicationEventPublisher eventPublisher;
	private final EntityAdaptor entityAdaptor;

	@SafeVarargs public final <T extends IdDomain<?>> void publish(NoticeType noticeType, Long receiverId, T... entities) {
		List<T> entitiesAslist = Arrays.stream(entities).toList();
		if (!isPublishable(noticeType, entitiesAslist))
			throw new DomainException(INVARIANT_VIOLENCE, "알림 타입과 호환되지 않는 양식의 매개변수입니다.");
		List<NoticeParameter> parameters = entityAdaptor.adapt(entitiesAslist);
		NoticeEvent event = NoticeEvent.of(noticeType, parameters, receiverId);
		eventPublisher.publishEvent(event);
	}

	private final boolean isPublishable(NoticeType noticeType, List<? extends IdDomain<?>> entities) {
		return noticeType.getParameters().size() == entities.size()
				&& entities.stream()
				.map(IdDomain::getClass)
				.allMatch(noticeType.getParameters()::contains);
	}
}
