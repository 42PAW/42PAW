package proj.pet.testutil.testdouble.category;

import proj.pet.board.domain.Board;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;

import java.util.List;
import java.util.stream.Stream;

public class TestBoardCategoryFilter {

	public static List<BoardCategoryFilter> of(Board board, AnimalCategory... categories) {
		return Stream.of(categories)
				.map(category -> BoardCategoryFilter.of(board, category))
				.toList();
	}
}
