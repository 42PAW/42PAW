package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.board.domain.Board;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "BOARD_CATEGORY_FILTER")
@Getter
@ToString
public class BoardCategoryFilter extends IdentityDomain implements Validatable {

	@ToString.Exclude
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "BOARD_ID", nullable = false, insertable = false, updatable = false)
	private Board board;

	@ToString.Exclude
	@Column(name = "SPECIES", nullable = false)
	private Species species;


	private BoardCategoryFilter(Board board, Species species) {
		this.board = board;
		this.species = species;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static BoardCategoryFilter of(Board board, Species species) {
		return new BoardCategoryFilter(board, species);
	}

	@Override public boolean isValid() {
		return board != null && !board.isNew()
				&& species != null;
	}
}
