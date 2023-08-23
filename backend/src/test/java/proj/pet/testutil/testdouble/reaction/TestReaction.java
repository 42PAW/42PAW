package proj.pet.testutil.testdouble.reaction;

import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

public class TestReaction {
	public static List<Reaction> ofMany(Board board, ReactionType reactionType, LocalDateTime now, Member... members) {
		return Stream.of(members)
				.map(member -> Reaction.of(board, member, reactionType, now))
				.toList();
	}
}
