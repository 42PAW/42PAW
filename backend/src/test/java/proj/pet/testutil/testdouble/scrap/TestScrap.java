package proj.pet.testutil.testdouble.scrap;

import lombok.Builder;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.scrap.domain.Scrap;
import proj.pet.testutil.testdouble.TestEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestScrap implements TestEntity<Scrap, Long> {

	@Builder.Default
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(1, 1, 1, 1, 1);
	@Builder.Default
	private Member member = null;
	@Builder.Default
	private Board board = null;
	@Builder.Default
	private LocalDateTime createdAt = DEFAULT_TIME;

	public static List<Scrap> ofMany(Board board, LocalDateTime now, Member... members) {
		return Stream.of(members)
				.map(member -> Scrap.of(member, board, now))
				.toList();
	}

	@Override public Scrap asEntity() {
		return Scrap.of(
				member,
				board,
				createdAt
		);
	}

	@Override public Scrap asMockEntity(Long id) {
		Scrap scrap = mock(Scrap.class);
		lenient().when(scrap.getId()).thenReturn(id);
		lenient().when(scrap.getMember()).thenReturn(member);
		lenient().when(scrap.getBoard()).thenReturn(board);
		lenient().when(scrap.getCreatedAt()).thenReturn(createdAt);
		return scrap;
	}
}
