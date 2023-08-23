package proj.pet.testutil.testdouble.scrap;

import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.scrap.domain.Scrap;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

public class TestScrap {
	public static List<Scrap> ofMany(Board board, LocalDateTime now, Member... members) {
		return Stream.of(members)
				.map(member -> Scrap.of(member, board, now))
				.toList();
	}
}
