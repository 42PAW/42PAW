package proj.pet.reaction.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "REACTION",
		uniqueConstraints = {@UniqueConstraint(name = "UNIQUE_REACTION", columnNames = {"MEMBER_ID", "BOARD_ID"})})
@Getter
public class Reaction extends IdDomain implements Validatable {

	@Column(name = "MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Long memberId;

	@Column(name = "BOARD_ID", nullable = false, insertable = false, updatable = false)
	private Long boardId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "BOARD_ID", nullable = false, updatable = false)
	private Board board;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	private Member member;

	@Column(name = "REACTION_TYPE", nullable = false, length = 32)
	@Enumerated(EnumType.STRING)
	private ReactionType reactionType;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	protected Reaction(Board board, Member member, ReactionType reactionType, LocalDateTime now) {
		this.board = board;
		this.member = member;
		this.reactionType = reactionType;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Reaction of(Board board, Member member, ReactionType reactionType, LocalDateTime now) {
		return new Reaction(board, member, reactionType, now);
	}

	@Override public boolean isValid() {
		return board != null
				&& !board.isNew()
				&& member != null
				&& !member.isNew()
				&& reactionType != null
				&& createdAt != null;
	}
}
