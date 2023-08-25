package proj.pet.report.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

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
@ToString
public class Report extends IdentityDomain implements Validatable {

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "REPORTED_MEMBER_ID", nullable = false, updatable = false)
	private Member to;

	@Column(name = "BOARD_ID")
	private Long boardId;

	@Column(name = "COMMENT_ID")
	private Long commentId;

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

	public static Report ofBoard(Member from, Member to, Long boardId, ReportReason reason,
	                             String content, LocalDateTime now) {
		Report report = new Report(from, to, reason, content, now);
		report.boardId = boardId;
		return report;
	}

	public static Report ofComment(Member from, Member to, Long boardId, Long commentId,
	                               ReportReason reason, String content, LocalDateTime now) {
		Report report = new Report(from, to, reason, content, now);
		report.boardId = boardId;
		report.commentId = commentId;
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
