package proj.pet.testutil.testdouble.reaction;

import lombok.Builder;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.testutil.testdouble.TestEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestReaction implements TestEntity<Reaction, Long> {

	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(1, 1, 1, 1, 1);
	public static final ReactionType DEFAULT_REACTION_TYPE = ReactionType.LIKE;

	@Builder.Default
	private Board board = null;
	@Builder.Default
	private Member member = null;
	@Builder.Default
	private ReactionType reactionType = DEFAULT_REACTION_TYPE;
	@Builder.Default
	private LocalDateTime createdAt = DEFAULT_TIME;


	public static List<Reaction> ofMany(Board board, ReactionType reactionType, LocalDateTime now, Member... members) {
		return Stream.of(members)
				.map(member -> Reaction.of(board, member, reactionType, now))
				.toList();
	}

	@Override public Reaction asEntity() {
		return Reaction.of(
				board,
				member,
				reactionType,
				createdAt
		);
	}

	@Override public Reaction asMockEntity(Long id) {
		Reaction reaction = mock(Reaction.class);
		lenient().when(reaction.getId()).thenReturn(id);
		lenient().when(reaction.getBoard()).thenReturn(board);
		lenient().when(reaction.getMember()).thenReturn(member);
		lenient().when(reaction.getReactionType()).thenReturn(reactionType);
		lenient().when(reaction.getCreatedAt()).thenReturn(createdAt);
		return reaction;
	}
}
