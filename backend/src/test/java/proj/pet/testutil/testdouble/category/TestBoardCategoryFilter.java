package proj.pet.testutil.testdouble.category;

import lombok.Builder;
import proj.pet.board.domain.Board;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.testutil.testdouble.TestEntity;
import proj.pet.utils.domain.ConsumptionCompositeKey;

import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestBoardCategoryFilter implements TestEntity<BoardCategoryFilter, ConsumptionCompositeKey> {
	@Builder.Default
	private AnimalCategory animalCategory = null;
	@Builder.Default
	private Board board = null;

	public static List<BoardCategoryFilter> ofMany(Board board, AnimalCategory... categories) {
		return Stream.of(categories)
				.map(category -> BoardCategoryFilter.of(board, category))
				.toList();
	}

	@Override public BoardCategoryFilter asEntity() {
		return BoardCategoryFilter.of(
				board,
				animalCategory
		);
	}

	@Override public BoardCategoryFilter asMockEntity(ConsumptionCompositeKey id) {
		BoardCategoryFilter boardCategoryFilter = mock(BoardCategoryFilter.class);
		lenient().when(boardCategoryFilter.getId()).thenReturn(id);
		lenient().when(boardCategoryFilter.getBoard()).thenReturn(board);
		lenient().when(boardCategoryFilter.getAnimalCategory()).thenReturn(animalCategory);
		return boardCategoryFilter;
	}
}
