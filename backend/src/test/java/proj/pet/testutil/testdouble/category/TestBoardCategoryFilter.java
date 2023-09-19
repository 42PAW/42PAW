package proj.pet.testutil.testdouble.category;

import lombok.Builder;
import proj.pet.board.domain.Board;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.testutil.testdouble.TestEntity;

import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestBoardCategoryFilter implements TestEntity<BoardCategoryFilter, Long> {
	public static final Species DEFAULT_CATEGORY = Species.DOG;

	@Builder.Default
	private final Species category = DEFAULT_CATEGORY;
	@Builder.Default
	private Board board = null;

	public static List<BoardCategoryFilter> ofMany(Board board, Species... categories) {
		return Stream.of(categories)
				.map(category -> BoardCategoryFilter.of(board, category))
				.toList();
	}

	@Override public BoardCategoryFilter asEntity() {
		return BoardCategoryFilter.of(
				board,
				category
		);
	}

	@Override public BoardCategoryFilter asMockEntity(Long id) {
		BoardCategoryFilter boardCategoryFilter = mock(BoardCategoryFilter.class);
		lenient().when(boardCategoryFilter.getId()).thenReturn(id);
		lenient().when(boardCategoryFilter.getBoard()).thenReturn(board);
		lenient().when(boardCategoryFilter.getSpecies()).thenReturn(category);
		return boardCategoryFilter;
	}
}
