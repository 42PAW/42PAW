package proj.pet.testutil.testdouble.report;

import lombok.Builder;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.member.domain.Member;
import proj.pet.report.domain.Report;
import proj.pet.report.domain.ReportReason;
import proj.pet.testutil.testdouble.TestEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestReport implements TestEntity<Report, Long> {

	public static final String DEFAULT_CONTENT = "content";
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);
	public static final ReportReason DEFAULT_REPORT_REASON = ReportReason.ETC;

	@Builder.Default
	private final Member from = null;
	@Builder.Default
	private final Member to = null;
	@Builder.Default
	private final Long boardId = null;
	@Builder.Default
	private final Long commentId = null;
	@Builder.Default
	private final ReportReason reportReason = DEFAULT_REPORT_REASON;
	@Builder.Default
	private final String content = DEFAULT_CONTENT;
	@Builder.Default
	private final LocalDateTime createdAt = DEFAULT_TIME;

	public static List<Report> ofMany(Member to, Board board, Comment comment, LocalDateTime now, ReportReason reason, String content, Member... members) {
		if (board != null) {
			return Arrays.stream(members)
					.map(member -> TestReport.builder()
							.from(member)
							.to(to)
							.boardId(board.getId())
							.reportReason(reason)
							.content(content)
							.createdAt(now)
							.build()
							.asBoardReport()
					).toList();
		}
		if (comment != null) {
			return Arrays.stream(members)
					.map(member -> TestReport.builder()
							.from(member)
							.to(to)
							.boardId(board.getId())
							.commentId(comment.getId())
							.reportReason(reason)
							.content(content)
							.createdAt(now)
							.build()
							.asCommentReport()
					).toList();
		}
		if (board == null && comment == null) {
			return Arrays.stream(members)
					.map(member -> TestReport.builder()
							.from(member)
							.to(to)
							.reportReason(reason)
							.content(content)
							.createdAt(now)
							.build()
							.asMemberReport()
					).toList();
		}
		return null;
	}

	@Override public Report asEntity() {
		throw new UnsupportedOperationException("asBoardReport, asMemberReport, asCommentReport를 사용해야 합니다.");
	}

	public Report asBoardReport() {
		return Report.ofBoard(
				this.from,
				this.to,
				this.boardId,
				this.reportReason,
				this.content,
				this.createdAt
		);
	}

	public Report asMemberReport() {
		return Report.ofMember(
				this.from,
				this.to,
				this.reportReason,
				this.content,
				this.createdAt
		);
	}

	public Report asCommentReport() {
		return Report.ofComment(
				this.from,
				this.to,
				this.boardId,
				this.commentId,
				this.reportReason,
				this.content,
				this.createdAt
		);
	}

	@Override public Report asMockEntity(Long id) {
		Report report = mock(Report.class);
		lenient().when(report.getId()).thenReturn(id);
		lenient().when(report.getFrom()).thenReturn(this.from);
		lenient().when(report.getTo()).thenReturn(this.to);
		lenient().when(report.getBoardId()).thenReturn(this.boardId);
		lenient().when(report.getCommentId()).thenReturn(this.commentId);
		lenient().when(report.getReason()).thenReturn(this.reportReason);
		lenient().when(report.getContent()).thenReturn(this.content);
		lenient().when(report.getCreatedAt()).thenReturn(this.createdAt);
		return report;
	}
}
