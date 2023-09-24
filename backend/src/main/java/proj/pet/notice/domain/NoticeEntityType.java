package proj.pet.notice.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NoticeEntityType {
	MEMBER("{MBR/%d/%s}"), // {MBR/1/sanan}
	COMMENT("{CMT/%d/%s}"), // {CMT/2/jpark2}
	BOARD("{BRD/%d/%s}"), // {BRD/3/hyungnoh}
	FOLLOW("{FLW/%d/%s}"), // {FLW/1/sanan}
	; // %d = 멤버 아이디, %s = 멤버 닉네임

	private final String placeholder;
}
