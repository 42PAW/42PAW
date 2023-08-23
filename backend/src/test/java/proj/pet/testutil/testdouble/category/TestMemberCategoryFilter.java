package proj.pet.testutil.testdouble.category;

import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.member.domain.Member;

import java.util.List;
import java.util.stream.Stream;

public class TestMemberCategoryFilter {

	public static List<MemberCategoryFilter> of(Member member, AnimalCategory... categories) {
		return Stream.of(categories)
				.map(category -> MemberCategoryFilter.of(member, category))
				.toList();
	}
}
