package proj.pet.board.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.domain.BoardMediaManager;
import proj.pet.board.repository.BoardCategoryFilterRepository;
import proj.pet.board.repository.BoardMediaRepository;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.testutil.test.UnitTest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.category.TestAnimalCategory;
import proj.pet.testutil.testdouble.category.TestBoardCategoryFilter;
import proj.pet.testutil.testdouble.member.TestMember;
import proj.pet.utils.domain.ConsumptionCompositeKey;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;

public class BoardServiceImplTest extends UnitTest {

	private static final Long IGNORE_ID = 999L;
	@InjectMocks
	private BoardServiceImpl boardService;
	@Mock
	private BoardRepository boardRepository;
	@Mock
	private MemberRepository memberRepository;
	@Mock
	private BoardCategoryFilterRepository boardCategoryFilterRepository;
	@Mock
	private BoardMediaManager boardMediaManager;
	@Mock
	private BoardMediaRepository boardMediaRepository;
	@Mock
	private AnimalCategoryRepository animalCategoryRepository;
	@Mock
	private CommentRepository commentRepository;

	private MultipartFile stubMultipartFile() {
		MultipartFile multipartFile = mock(MultipartFile.class);
		given(multipartFile.getContentType()).willReturn("image/png");
		return multipartFile;
	}

	@Nested
	@DisplayName("게시글을 생성할 때")
	class CreateBoard {

		private final Long existMemberId = 1L;
		private final Long noneExistMemberId = null;
		private final String RANDOM_STRING = "random";

		private final Board stubbedBoard = TestBoard.builder().build().asMockEntity(IGNORE_ID);

		private final List<Species> givenSpecies = List.of(Species.DOG, Species.REPTILE);
		private final List<MultipartFile> givenMedia = List.of(stubMultipartFile(), stubMultipartFile());
		private final String givenContent = "content";
		private final LocalDateTime now = LocalDateTime.now();
		private final List<AnimalCategory> stubbedAnimalCategories = List.of(
				TestAnimalCategory.builder()
						.build().asMockEntity(IGNORE_ID),
				TestAnimalCategory.builder()
						.build().asMockEntity(IGNORE_ID));
		private final List<BoardCategoryFilter> stubbedBoardCategoryFilters = List.of(
				TestBoardCategoryFilter.builder()
						.build().asMockEntity(ConsumptionCompositeKey.of(IGNORE_ID, IGNORE_ID)),
				TestBoardCategoryFilter.builder()
						.build().asMockEntity(ConsumptionCompositeKey.of(IGNORE_ID, IGNORE_ID)));
		private final List<BoardMedia> stubbedBoardMedias = List.of(
				TestBoardMedia.builder()
						.build().asMockEntity(IGNORE_ID),
				TestBoardMedia.builder()
						.build().asMockEntity(IGNORE_ID));

		@Test
		@DisplayName("멤버가 존재하면, 생성에 성공한다.") // ?
		void 성공_게시글_생성() {
			//given
			Member member = TestMember.builder().build().asMockEntity(existMemberId);
			given(memberRepository.findById(existMemberId)).willReturn(Optional.of(member));
			given(boardRepository.save(any(Board.class))).willReturn(stubbedBoard);
			given(animalCategoryRepository.findBySpeciesIn(givenSpecies)).willReturn(stubbedAnimalCategories);
			given(boardCategoryFilterRepository.saveAll(anyList())).willReturn(stubbedBoardCategoryFilters);
			given(boardMediaManager.uploadMedia(any(MultipartFile.class), any(String.class))).willReturn(RANDOM_STRING);
			given(boardMediaRepository.saveAll(anyList())).willReturn(stubbedBoardMedias);

			//when
			boardService.createBoard(existMemberId, givenSpecies, givenMedia, givenContent, now);

			//then
			then(stubbedBoard).should().addCategoryFilters(stubbedBoardCategoryFilters);
			then(boardMediaManager).should(times(stubbedBoardMedias.size())).uploadMedia(any(MultipartFile.class), any(String.class));
			then(stubbedBoard).should().addMediaList(stubbedBoardMedias);
			then(boardRepository).should().save(stubbedBoard);
		}

	}
}
