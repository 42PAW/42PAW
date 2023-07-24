package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.ConsumptionCompositeKey;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Table(name = "member_category_filter")
@Getter
@Entity
public class MemberCategoryFilter {
	@EmbeddedId
	private ConsumptionCompositeKey key;

	@MapsId("consumerId")
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "consumer_id", nullable = false, updatable = false, insertable = false)
	private Member member;

	@MapsId("providerId")
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "provider_id", nullable = false, updatable = false, insertable = false)
	private AnimalCategory animalCategory;
}
