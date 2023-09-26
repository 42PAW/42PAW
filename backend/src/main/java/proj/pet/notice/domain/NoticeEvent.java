package proj.pet.notice.domain;

import lombok.Getter;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class NoticeEvent implements Validatable {
	private static final String DELIMITER = ",";
	private final NoticeType noticeType;
	private final List<NoticeParameter> parameters;
	private final Long receiverId;

	private NoticeEvent(NoticeType noticeType, List<NoticeParameter> parameters, Long receiverId) {
		this.noticeType = noticeType;
		this.parameters = parameters;
		this.receiverId = receiverId;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static NoticeEvent of(NoticeType noticeType, List<NoticeParameter> parameters, Long receiverId) {
		return new NoticeEvent(noticeType, parameters, receiverId);
	}

	public Notice toNotice() {
		return Notice.of(receiverId, noticeType, this.extractParameters());
	}

	private String extractParameters() {
		return parameters.stream()
				.map(NoticeParameter::getParameter)
				.collect(Collectors.joining(DELIMITER));
	}

	@Override
	public boolean isValid() {
		return noticeType != null
				&& parameters != null
				&& receiverId != null;
	}
}
