package proj.pet.testutil.testdouble.block;

import lombok.Builder;
import proj.pet.block.domain.Block;
import proj.pet.member.domain.Member;
import proj.pet.testutil.testdouble.TestEntity;
import proj.pet.utils.domain.MemberCompositeKey;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestBlock implements TestEntity<Block, MemberCompositeKey> {
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);

	@Builder.Default
	private Member from = null;
	@Builder.Default
	private Member to = null;
	@Builder.Default
	private LocalDateTime blockedAt = DEFAULT_TIME;

	public static List<Block> ofMany(Member to, LocalDateTime now, Member... froms) {
		return Stream.of(froms)
				.map(from -> Block.of(from, to, now))
				.toList();
	}

	@Override public Block asEntity() {
		return Block.of(
				from,
				to,
				blockedAt
		);
	}

	@Override public Block asMockEntity(MemberCompositeKey id) {
		Block block = mock(Block.class);
		lenient().when(block.getId()).thenReturn(id);
		lenient().when(block.getFrom()).thenReturn(from);
		lenient().when(block.getTo()).thenReturn(to);
		lenient().when(block.getBlockedAt()).thenReturn(blockedAt);
		return block;
	}
}
