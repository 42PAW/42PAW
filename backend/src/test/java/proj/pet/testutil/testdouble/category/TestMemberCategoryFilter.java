package proj.pet.testutil.testdouble.category;

import lombok.Builder;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.member.domain.Member;
import proj.pet.testutil.testdouble.TestEntity;
import proj.pet.utils.domain.ConsumptionCompositeKey;

import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

public class TestMemberCategoryFilter implements TestEntity<MemberCategoryFilter, ConsumptionCompositeKey> {

	@Builder.Default
	private final AnimalCategory animalCategory = null;
	@Builder.Default
	private final Member member = null;

	public static List<MemberCategoryFilter> ofMany(Member member, AnimalCategory... categories) {
		return Stream.of(categories)
				.map(category -> MemberCategoryFilter.of(member, category))
				.toList();
	}

	@Override public MemberCategoryFilter asEntity() {
		return MemberCategoryFilter.of(
				member,
				animalCategory
		);
	}

	@Override public MemberCategoryFilter asMockEntity(ConsumptionCompositeKey id) {
		MemberCategoryFilter boardCategoryFilter = mock(MemberCategoryFilter.class);
		lenient().when(boardCategoryFilter.getId()).thenReturn(id);
		lenient().when(boardCategoryFilter.getMember()).thenReturn(member);
		lenient().when(boardCategoryFilter.getAnimalCategory()).thenReturn(animalCategory);
		return boardCategoryFilter;
	}
}
