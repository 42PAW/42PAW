package proj.pet.testutil.testdouble.follow;

import proj.pet.follow.domain.Follow;
import proj.pet.member.domain.Member;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

public class TestFollow {

	public static List<Follow> ofMany(Member to, LocalDateTime now, Member... froms) {
		return Stream.of(froms)
				.map(from -> Follow.of(from, to, now))
				.toList();
	}
}
