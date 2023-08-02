package proj.pet.report.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.member.domain.Member;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Getter
public class Report {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

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
	private ReportReason reason;

	@Column(name = "content", length = 255)
	private String content;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
}
