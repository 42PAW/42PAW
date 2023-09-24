package proj.pet.notice.domain;

import lombok.Getter;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class NoticeEvent implements Validatable {
	private static final String DELIMITER = ",";
	private final String title;
	private final NoticeFormat format;
	private final List<NoticeParameter> parameters;
	private final Long receiverId;

	private NoticeEvent(String title, NoticeFormat format, List<NoticeParameter> parameters, Long receiverId) {
		this.title = title;
		this.format = format;
		this.parameters = parameters;
		this.receiverId = receiverId;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static NoticeEvent of(String title, NoticeFormat format, List<NoticeParameter> parameters, Long receiverId) {
		return new NoticeEvent(title, format, parameters, receiverId);
	}

	public Notice toNotice() {
		return Notice.of(receiverId, title, format.getFormat(), this.extractParameters());
	}

	private String extractParameters() {
		return parameters.stream()
				.map(NoticeParameter::getParameter)
				.collect(Collectors.joining(DELIMITER));
	}

	@Override
	public boolean isValid() {
		return title != null && !title.isBlank()
				&& format != null && format.isValid()
				&& parameters != null && !parameters.isEmpty()
				&& format.countPlaceholders() == parameters.size();
	}
}
