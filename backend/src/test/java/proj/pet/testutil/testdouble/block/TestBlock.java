package proj.pet.testutil.testdouble.block;

import proj.pet.block.domain.Block;
import proj.pet.member.domain.Member;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

public class TestBlock {

	public static List<Block> ofMany(Member to, LocalDateTime now, Member... froms) {
		return Stream.of(froms)
				.map(from -> Block.of(from, to, now))
				.toList();
	}
}
