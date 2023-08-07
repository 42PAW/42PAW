package proj.pet.comment.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
public class Comment extends IdDomain implements Validatable {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", nullable = false, updatable = false)
	private Board board;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

	@Column(name = "content", nullable = false, length = 128)
	private String content;

	protected Comment(Board board, Member member, LocalDateTime createdAt) {
		this.board = board;
		this.member = member;
		this.createdAt = createdAt;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Comment of(Board board, Member member, LocalDateTime createdAt) {
		return new Comment(board, member, createdAt);
	}

	@Override
	public boolean isValid() {
		return board != null
				&& !board.isNew()
				&& member != null
				&& !member.isNew()
				&& createdAt != null;
	}
}
