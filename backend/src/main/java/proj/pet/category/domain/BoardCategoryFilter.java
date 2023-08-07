package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.utils.domain.ConsumptionCompositeKey;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "BOARD_CATEGORY_FILTER")
@Getter
public class BoardCategoryFilter implements Validatable {

	@EmbeddedId
	private ConsumptionCompositeKey key;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "CONSUMER_ID", nullable = false, insertable = false, updatable = false)
	private Board board;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "PROVIDER_ID", nullable = false, insertable = false, updatable = false)
	private AnimalCategory animalCategory;

	private BoardCategoryFilter(Board board, AnimalCategory animalCategory) {
		this.key = ConsumptionCompositeKey.of(board.getId(), animalCategory.getId());
		this.board = board;
		this.animalCategory = animalCategory;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static BoardCategoryFilter of(Board board, AnimalCategory animalCategory) {
		return new BoardCategoryFilter(board, animalCategory);
	}

	@Override public boolean isValid() {
		return board != null && !board.isNew()
				&& animalCategory != null && !animalCategory.isNew();
	}
}
