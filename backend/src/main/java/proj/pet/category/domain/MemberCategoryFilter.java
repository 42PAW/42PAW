package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.ConsumptionCompositeKey;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Table(name = "MEMBER_CATEGORY_FILTER")
@Getter
@Entity
public class MemberCategoryFilter implements Validatable {
	@EmbeddedId
	private ConsumptionCompositeKey key;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "CONSUMER_ID", nullable = false, insertable = false, updatable = false)
	private Member member;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "PROVIDER_ID", nullable = false, insertable = false, updatable = false)
	private AnimalCategory animalCategory;

	private MemberCategoryFilter(Member member, AnimalCategory animalCategory) {
		this.key = ConsumptionCompositeKey.of(member.getId(), animalCategory.getId());
		this.member = member;
		this.animalCategory = animalCategory;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static MemberCategoryFilter of(Member member, AnimalCategory animalCategory) {
		return new MemberCategoryFilter(member, animalCategory);
	}

	@Override public boolean isValid() {
		return member != null
				&& !member.isNew()
				&& animalCategory != null
				&& !animalCategory.isNew();
	}
}
