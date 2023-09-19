package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Table(name = "MEMBER_CATEGORY_FILTER")
@Getter
@Entity
@ToString
public class MemberCategoryFilter extends IdentityDomain implements Validatable {

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false)
	private Member member;

	@Column(name = "SPECIES", nullable = false)
	private Species species;

	private MemberCategoryFilter(Member member, Species species) {
		this.member = member;
		this.species = species;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static MemberCategoryFilter of(Member member, Species species) {
		return new MemberCategoryFilter(member, species);
	}

	@Override
	public boolean isValid() {
		return member != null
				&& !member.isNew()
				&& species != null;
	}
}
