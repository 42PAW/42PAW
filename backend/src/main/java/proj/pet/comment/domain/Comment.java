package proj.pet.comment.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "COMMENT")
@Getter
public class Comment extends IdentityDomain implements Validatable {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BOARD_ID", nullable = false, updatable = false)
	private Board board;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	private Member member;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "DELETED_AT")
	private LocalDateTime deletedAt;

	@Column(name = "CONTENT", nullable = false, length = 128)
	private String content;

	protected Comment(Board board, Member member, String content, LocalDateTime createdAt) {
		this.board = board;
		this.member = member;
		this.content = content;
		this.createdAt = createdAt;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Comment of(Board board, Member member, String content, LocalDateTime createdAt) {
		return new Comment(board, member, content, createdAt);
	}

	@Override public boolean isValid() {
		return board != null
				&& !board.isNew()
				&& member != null
				&& !member.isNew()
				&& createdAt != null;
	}

	public boolean isOwnedBy(Member member) {
		return this.member.equals(member);
	}
}
