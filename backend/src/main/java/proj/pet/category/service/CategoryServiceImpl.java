package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.util.List;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;

	@Override
	public void updateMemberCategories(Long memberId, List<Species> speciesList) {
		if (speciesList == null || speciesList.isEmpty()) {
			throw new ServiceException(INVALID_ARGUMENT, "카테고리 필터를 선택해주세요.");
		}
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		List<MemberCategoryFilter> categories = speciesList.stream()
				.map(category -> MemberCategoryFilter.of(member, category)).toList();
		member.setCategoryFilters(categories);
		memberRepository.save(member);
	}
}
