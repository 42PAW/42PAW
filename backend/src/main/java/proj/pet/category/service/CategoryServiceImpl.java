package proj.pet.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.util.List;

import static proj.pet.exception.ExceptionStatus.*;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final AnimalCategoryRepository animalCategoryRepository;

	@Override public void updateMemberCategories(Long memberId, List<Species> speciesList) {
		Member member = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		List<MemberCategoryFilter> categories = animalCategoryRepository.findBySpeciesIn(speciesList)
				.stream().map(category -> MemberCategoryFilter.of(member, category)).toList();
		member.setCategoryFilters(categories);
		memberRepository.save(member);
	}

	@Override public void updateBoardCategories(Long memberId, Long boardId, List<Species> speciesList) {
		Member member = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = boardRepository.findById(boardId).orElseThrow(NOT_FOUND_BOARD::asServiceException);
		if (!board.isOwnedBy(member)) {
			throw UNAUTHENTICATED.asServiceException();
		}
		List<BoardCategoryFilter> categories = animalCategoryRepository.findBySpeciesIn(speciesList)
				.stream().map(category -> BoardCategoryFilter.of(board, category)).toList();
		board.setCategoryFilters(categories);
		boardRepository.save(board);
	}
}
