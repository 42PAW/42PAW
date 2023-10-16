package proj.pet.notice.domain;

import lombok.Getter;

@Getter
public class NoticeParameter {
	private final String parameter;

	private NoticeParameter(String parameter) {
		this.parameter = parameter;
	}

	public static NoticeParameter of(String parameter) {
		return new NoticeParameter(parameter);
	}
}
