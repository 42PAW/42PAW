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
import proj.pet.comment.domain.Comment;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.dto.ExceptionStatusDto;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.testutil.test.UnitTest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.category.TestAnimalCategory;
import proj.pet.testutil.testdouble.category.TestBoardCategoryFilter;
import proj.pet.testutil.testdouble.comment.TestComment;
import proj.pet.testutil.testdouble.member.TestMember;
import proj.pet.utils.domain.ConsumptionCompositeKey;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.InstanceOfAssertFactories.type;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

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
		@DisplayName("멤버가 존재하면, 카테고리 필터와 미디어를 업데이트하고, 게시글 생성에 성공한다.") // ?
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

		@DisplayName("멤버가 존재하지 않으면, 생성에 실패한다.")
		@Test
		void 실패_존재하지_않는_멤버() {
			//given
			Member noneExistMember = TestMember.builder().build().asMockEntity(noneExistMemberId);
			given(memberRepository.findById(noneExistMemberId)).willReturn(Optional.empty());

			//when, then
			assertThatThrownBy(() -> boardService.createBoard(noneExistMemberId, givenSpecies, givenMedia, givenContent, now))
					.asInstanceOf(type(ServiceException.class))
					.extracting(ServiceException::getStatus)
					.extracting(ExceptionStatusDto::getStatusCode)
					.isEqualTo(NOT_FOUND_MEMBER.getStatusCode());
		}
	}

	@Nested
	@DisplayName("게시글을 지우려고 할 때")
	class DeleteBoard {

		private final LocalDateTime now = LocalDateTime.now();
		private final Member author = TestMember.builder()
				.build().asMockEntity(1L);
		private final Member normalMember = TestMember.builder()
				.build().asMockEntity(2L);
		private final Member anonymous = TestMember.builder()
				.build().asMockEntity(IGNORE_ID);
		private final Map<Member, String> commentsOfBoard = new HashMap<>();
		private final Long boardId = IGNORE_ID;
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
		@DisplayName("본인의 게시글이라면 댓글, 정적 리소스를 삭제하고, 게시글을 지울 수 있다.")
		void 성공_본인의_게시글() throws Exception {
			//given
			Board board = TestBoard.builder()
					.member(author)
					.deletedAt(null)
					.build().asMockEntity(boardId);
			commentsOfBoard.put(anonymous, "blah blah 1");
			commentsOfBoard.put(anonymous, "blah blah 2");
			List<Comment> stubbedComments = TestComment.ofMany(board, commentsOfBoard);
			given(boardRepository.findById(boardId)).willReturn(Optional.of(board));
			given(board.getComments()).willReturn(stubbedComments);
			given(board.getCategoryFilters()).willReturn(stubbedBoardCategoryFilters);
			given(board.getMediaList()).willReturn(stubbedBoardMedias);

			//when
			boardService.deleteBoard(author.getId(), board.getId());

			//then
			then(boardRepository).should().findById(boardId);
			then(commentRepository).should().deleteAll(board.getComments());
			then(boardCategoryFilterRepository).should().deleteAll(board.getCategoryFilters());
			then(boardMediaRepository).should().deleteAll(board.getMediaList());
			then(board).should().delete();
		}

	}
}