package proj.pet.notice.domain;

import lombok.Getter;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;

import java.util.List;

@Getter
public enum NoticeType {
	NEW_FOLLOW(List.of(Member.class)),
	NEW_BOARD_COMMENT(List.of(Board.class, Member.class)),
	NEW_COMMENT_TAG(List.of(Board.class, Member.class)),
	REACTION_TEN(List.of(Board.class)),
	REACTION_FORTY_TWO(List.of(Board.class)),
	REACTION_ONE_HUNDRED(List.of(Board.class)),
	;

	private final List<Class<?>> parameters;

	NoticeType(List<Class<?>> parameters) {
		this.parameters = parameters;
	}
}
