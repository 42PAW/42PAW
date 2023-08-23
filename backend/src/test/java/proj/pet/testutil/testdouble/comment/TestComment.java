package proj.pet.testutil.testdouble.comment;

import lombok.Builder;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.member.domain.Member;
import proj.pet.testutil.testdouble.TestEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Builder
public class TestComment implements TestEntity<Comment> {

	public static final String DEFAULT_CONTENT = "content";
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);

	@Builder.Default
	private final Board board = null;
	@Builder.Default
	private final Member member = null;
	@Builder.Default
	private final String content = DEFAULT_CONTENT;
	@Builder.Default
	private final LocalDateTime localDateTime = DEFAULT_TIME;

	public static Comment asDefaultEntity(Board board, Member member) {
		return TestComment.builder()
				.board(board).member(member)
				.build().asEntity();
	}

	public static List<Comment> ofMany(Board board, Map<Member, String> memberCommentMap) {
		return memberCommentMap.entrySet().stream()
				.map(entry -> TestComment.builder()
						.board(board)
						.member(entry.getKey())
						.content(entry.getValue())
						.build()
						.asEntity()
				).toList();
	}

	@Override public Comment asEntity() {
		return Comment.of(
				this.board,
				this.member,
				this.content,
				this.localDateTime
		);
	}
}
