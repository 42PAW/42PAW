package proj.pet.report.domain;

import jakarta.persistence.*;
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
@Table(name = "REPORT")
@Getter
public class Report extends IdDomain implements Validatable {

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "REPORTED_MEMBER_ID", nullable = false, updatable = false)
	private Member to;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "BOARD_ID", nullable = false, updatable = false)
	private Board board;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "COMMENT_ID", nullable = false, updatable = false)
	private Comment comment;

	@Column(name = "REASON", nullable = false)
	private ReportReason reason;

	@Column(name = "CONTENT", length = 255)
	private String content;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	private Report(Member from, Member to, Board board, Comment comment, ReportReason reason, String content, LocalDateTime now) {
		this.from = from;
		this.to = to;
		this.board = board;
		this.comment = comment;
		this.reason = reason;
		this.content = content;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Report of(Member from, Member to, Board board, Comment comment, ReportReason reason, String content, LocalDateTime now) {
		return new Report(from, to, board, comment, reason, content, now);
	}

	@Override public boolean isValid() {
		return from != null && !from.isNew()
				&& to != null && !to.isNew()
				&& board != null && !board.isNew()
				&& comment != null && !comment.isNew()
				&& reason != null
				&& createdAt != null;
	}
}
