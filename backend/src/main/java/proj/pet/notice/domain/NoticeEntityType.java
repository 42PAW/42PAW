package proj.pet.notice.domain;

import static proj.pet.exception.ExceptionStatus.MALFORMED_ENTITY;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import proj.pet.exception.DomainException;

@Getter
@RequiredArgsConstructor
public enum NoticeEntityType {
	MEMBER("M/%s/%d"), // M/1/sanan
	BOARD("B/%d"), // B/3/hyungnoh
	; // %d = 멤버 아이디, %s = 멤버 닉네임

	private final String placeholder;

	public static NoticeEntityType from(String type) {
		for (NoticeEntityType noticeEntityType : values()) {
			if (noticeEntityType.name().startsWith(type)) {
				return noticeEntityType;
			}
		}
		throw new DomainException(MALFORMED_ENTITY);
	}
}
