package proj.pet.testutil.stub.board;

import lombok.Builder;
import lombok.Setter;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.domain.VisibleScope;
import proj.pet.member.domain.Member;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Setter
public class TestBoard {

	public static final VisibleScope DEFAULT_VISIBLE_SCOPE = VisibleScope.PUBLIC;
	public static final String DEFAULT_CONTENT = "content";
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);

	@Builder.Default
	private List<BoardMedia> mediaList = new ArrayList<>();
	private Member member;
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

	public Board asEntity() {
		Board board = Board.of(
				this.member,
				this.visibleScope,
				this.content,
				this.createdAt);
		if (this.mediaList != null && !this.mediaList.isEmpty())
			board.addMediaList(this.mediaList);
		return board;
	}
}
