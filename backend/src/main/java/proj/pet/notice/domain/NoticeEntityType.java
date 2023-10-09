package proj.pet.notice.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NoticeEntityType {
	MEMBER("M/%s/%d}"), // MBR/1/sanan
	BOARD("B/%d"), // BRD/3/hyungnoh
	; // %d = 멤버 아이디, %s = 멤버 닉네임

	private final String placeholder;
}
