package proj.pet.notice.domain;

import java.util.List;
import lombok.Getter;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;

@Getter
public enum NoticeType {
	NEW_FOLLOW(List.of(Member.class), NoticeEntityType.MEMBER),
	NEW_BOARD_COMMENT(List.of(Board.class, Member.class), NoticeEntityType.MEMBER),
	NEW_COMMENT_TAG(List.of(Board.class, Member.class), NoticeEntityType.MEMBER),
	REACTION_TEN(List.of(Board.class), NoticeEntityType.BOARD),
	REACTION_FORTY_TWO(List.of(Board.class), NoticeEntityType.BOARD),
	REACTION_ONE_HUNDRED(List.of(Board.class), NoticeEntityType.BOARD),
	;

	private final List<Class<?>> parameters;
	private final NoticeEntityType thumbnailEntity;

	NoticeType(List<Class<?>> parameters, NoticeEntityType thumbnailEntity) {
		this.parameters = parameters;
		this.thumbnailEntity = thumbnailEntity;
	}
}
