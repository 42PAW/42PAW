package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.board.domain.Board;
import proj.pet.utils.domain.ConsumptionCompositeKey;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "board_category_filter")
@Getter
public class BoardCategoryFilter {

	@EmbeddedId
	private ConsumptionCompositeKey key;

	@MapsId("consumerId")
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "consumer_id", nullable = false, updatable = false)
	private Board board;

	@MapsId("providerId")
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "provider_id", nullable = false, updatable = false)
	private AnimalCategory animalCategory;
}
