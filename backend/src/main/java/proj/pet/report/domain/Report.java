package proj.pet.report.domain;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "REPORT",
		uniqueConstraints = {
				@UniqueConstraint(name = "UNIQUE_BOARD_REPORT", columnNames = {"MEMBER_ID",
						"REPORTED_MEMBER_ID", "BOARD_ID"}),
				@UniqueConstraint(name = "UNIQUE_COMMENT_REPORT", columnNames = {"MEMBER_ID",
						"REPORTED_MEMBER_ID", "COMMENT_ID"})
		})
@Getter
public class Report extends IdDomain implements Validatable {

	@Column(name = "MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Long memberId;

	@Column(name = "REPORTED_MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Long reportedMemberId;

	@Column(name = "BOARD_ID", insertable = false, updatable = false)
	private Long boardId;

	@Column(name = "COMMENT_ID", insertable = false, updatable = false)
	private Long commentId;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "REPORTED_MEMBER_ID", nullable = false, updatable = false)
	private Member to;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "BOARD_ID", updatable = false)
	private Board board;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "COMMENT_ID", updatable = false)
	private Comment comment;

	@Column(name = "REASON", nullable = false, length = 32)
	@Enumerated(EnumType.STRING)
	private ReportReason reason;

	@Column(name = "CONTENT", length = 255)
	private String content;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	private Report(Member from, Member to, ReportReason reason, String content, LocalDateTime now) {
		this.from = from;
		this.to = to;
		this.reason = reason;
		this.content = content;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Report ofMember(Member from, Member to, ReportReason reason, String content,
			LocalDateTime now) {
		return new Report(from, to, reason, content, now);
	}

	public static Report ofBoard(Member from, Member to, Board board, ReportReason reason,
			String content, LocalDateTime now) {
		Report report = new Report(from, to, reason, content, now);
		report.board = board;
		return report;
	}

	public static Report ofComment(Member from, Member to, Board board, Comment comment,
			ReportReason reason, String content, LocalDateTime now) {
		Report report = new Report(from, to, reason, content, now);
		report.board = board;
		report.comment = comment;
		return report;
	}

	@Override
	public boolean isValid() {
		return from != null && !from.isNew()
				&& to != null && !to.isNew()
				&& reason != null
				&& createdAt != null;
	}
}
