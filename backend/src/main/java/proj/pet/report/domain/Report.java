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
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "REPORT")
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
