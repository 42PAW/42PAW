package proj.pet.notice.domain;

import lombok.Getter;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@Getter
public class NoticeFormat implements Validatable {
	private static final String PLACEHOLDER = "{}";
	private final String format;

	private NoticeFormat(String format) {
		this.format = format;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static NoticeFormat of(String placeholder) {
		return new NoticeFormat(placeholder);
	}

	public int countPlaceholders() {
		return format.split(PLACEHOLDER).length - 1;
	}

	@Override
	public boolean isValid() {
		return format != null && !format.isEmpty()
				&& format.contains(PLACEHOLDER);
	}
}
