package proj.pet.testutil.testdouble.category;

import lombok.Builder;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Member;
import proj.pet.testutil.testdouble.TestEntity;

import java.util.List;
import java.util.stream.Stream;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestMemberCategoryFilter implements TestEntity<MemberCategoryFilter, Long> {

	public static final Species DEFAULT_CATEGORY = Species.DOG;

	@Builder.Default
	private final Species category = DEFAULT_CATEGORY;
	@Builder.Default
	private final Member member = null;

	public static List<MemberCategoryFilter> ofMany(Member member, Species... categories) {
		return Stream.of(categories)
				.map(category -> MemberCategoryFilter.of(member, category))
				.toList();
	}

	public static List<MemberCategoryFilter> ofMany(Member member, List<Species> categories) {
		return categories.stream()
				.map(category -> MemberCategoryFilter.of(member, category))
				.toList();
	}

	@Override public MemberCategoryFilter asEntity() {
		return MemberCategoryFilter.of(
				member,
				category
		);
	}

	@Override public MemberCategoryFilter asMockEntity(Long id) {
		MemberCategoryFilter boardCategoryFilter = mock(MemberCategoryFilter.class);
		lenient().when(boardCategoryFilter.getId()).thenReturn(id);
		lenient().when(boardCategoryFilter.getMember()).thenReturn(member);
		lenient().when(boardCategoryFilter.getSpecies()).thenReturn(category);
		return boardCategoryFilter;
	}
}
