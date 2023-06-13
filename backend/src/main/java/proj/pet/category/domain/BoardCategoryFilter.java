package proj.pet.category.domain;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.utils.domain.ConsumptionCompositeKey;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "board_category_filter")
@Getter
public class BoardCategoryFilter {

	@EmbeddedId
	private ConsumptionCompositeKey key;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "consumer_id", nullable = false)
	private Board board;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "provider_id", nullable = false)
	private AnimalCategory animalCategory;
}
