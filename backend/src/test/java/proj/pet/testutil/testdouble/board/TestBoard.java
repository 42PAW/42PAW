package proj.pet.testutil.testdouble.board;

import lombok.Builder;
import lombok.Setter;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.member.domain.Member;
import proj.pet.testutil.testdouble.TestEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
@Setter
public class TestBoard implements TestEntity<Board, Long> {

	public static final VisibleScope DEFAULT_VISIBLE_SCOPE = VisibleScope.PUBLIC;
	public static final String DEFAULT_CONTENT = "content";
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);

	@Builder.Default
	private Member member = null;
	@Builder.Default
	private VisibleScope visibleScope = DEFAULT_VISIBLE_SCOPE;
	@Builder.Default
	private String content = DEFAULT_CONTENT;
	@Builder.Default
	private LocalDateTime updatedAt = DEFAULT_TIME;
	@Builder.Default
	private LocalDateTime createdAt = DEFAULT_TIME;
	@Builder.Default
	private LocalDateTime deletedAt = null;

	public static Board asDefaultEntity(Member member) {
		return TestBoard.builder().member(member).build().asEntity();
	}

	@Override
	public Board asEntity() {
		return Board.of(
				this.member,
				this.visibleScope,
				this.content,
				this.createdAt);
	}

	@Override
	public Board asMockEntity(Long id) {
		Board board = mock(Board.class);
		lenient().when(board.getId()).thenReturn(id);
		lenient().when(board.getMember()).thenReturn(this.member);
		lenient().when(board.getVisibleScope()).thenReturn(this.visibleScope);
		lenient().when(board.getContent()).thenReturn(this.content);
		lenient().when(board.getCreatedAt()).thenReturn(this.createdAt);
		lenient().when(board.getUpdatedAt()).thenReturn(this.updatedAt);
		lenient().when(board.getDeletedAt()).thenReturn(this.deletedAt);
		return board;
	}
}
