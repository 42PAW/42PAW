package proj.pet.board.domain;

import lombok.Getter;

/**
 * 게시물의 공개 범위
 */
@Getter
public enum VisibleScope {

	PUBLIC,
	BLINDED,

}
