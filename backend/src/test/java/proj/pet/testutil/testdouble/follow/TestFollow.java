package proj.pet.testutil.testdouble.follow;

import lombok.Builder;
import proj.pet.follow.domain.Follow;
import proj.pet.member.domain.Member;
import proj.pet.testutil.testdouble.TestEntity;
import proj.pet.utils.domain.MemberCompositeKey;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestFollow implements TestEntity<Follow, MemberCompositeKey> {

	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(1, 1, 1, 0, 0);
	@Builder.Default
	private Member from = null;
	@Builder.Default
	private Member to = null;
	@Builder.Default
	private LocalDateTime followedAt = DEFAULT_TIME;

	public static List<Follow> ofMany(Member to, LocalDateTime now, Member... froms) {
		return Stream.of(froms)
				.map(from -> Follow.of(from, to, now))
				.toList();
	}

	@Override public Follow asEntity() {
		return Follow.of(
				from,
				to,
				followedAt
		);
	}

	@Override public Follow asMockEntity(MemberCompositeKey id) {
		Follow follow = mock(Follow.class);
		lenient().when(follow.getId()).thenReturn(id);
		lenient().when(follow.getFrom()).thenReturn(from);
		lenient().when(follow.getTo()).thenReturn(to);
		lenient().when(follow.getFollowedAt()).thenReturn(followedAt);
		return follow;
	}
}
