package proj.pet.report.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Getter
public class Report extends IdDomain implements Validatable {

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "reported_member_id", nullable = false, updatable = false)
	private Member to;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "board_id", nullable = false, updatable = false)
	private Board board;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "comment_id", nullable = false, updatable = false)
	private Comment comment;

	@Column(name = "reason", nullable = false)
	@Enumerated(EnumType.STRING)
	private ReportReason reason;

	@Column(name = "content", length = 255)
	private String content;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Builder
	public Report(Member from, Member to, Board board, Comment comment, ReportReason reason, String content, LocalDateTime now) {
		this.from = from;
		this.to = to;
		this.board = board;
		this.comment = comment;
		this.reason = reason;
		this.content = content;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	@Override public boolean isValid() {
		return from != null
				&& !from.isNew()
				&& to != null
				&& !to.isNew()
				&& board != null
				&& !board.isNew()
				&& comment != null
				&& !comment.isNew()
				&& reason != null
				&& createdAt != null;
	}
}
