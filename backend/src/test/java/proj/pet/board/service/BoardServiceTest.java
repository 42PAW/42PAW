package proj.pet.board.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.domain.BoardMediaManager;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardCategoryFilterRepository;
import proj.pet.board.repository.BoardMediaRepository;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.member.domain.*;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
class BoardServiceTest {

	@Autowired
	private EntityManager em;
	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private BoardCategoryFilterRepository boardCategoryFilterRepository;

	@Autowired
	private BoardMediaRepository boardMediaRepository;

	private BoardMediaManager boardMediaManager;

	private BoardService boardService;

	@Autowired
	private AnimalCategoryRepository animalCategoryRepository;

	@BeforeEach
	void setUp() {
		boardMediaManager = mock(BoardMediaManager.class);
		boardService = new BoardServiceImpl(boardRepository, memberRepository, boardCategoryFilterRepository, boardMediaManager, boardMediaRepository, animalCategoryRepository);
	}

	@DisplayName("게시글을 생성할 수 있다.")
	@Disabled
	@Test
	void createBoard() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member member = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		List<AnimalCategory> categoryList = animalCategoryRepository.saveAll(List.of(
				AnimalCategory.of(Species.CAT),
				AnimalCategory.of(Species.DOG),
				AnimalCategory.of(Species.ETC)));
		MultipartFile mockImageFile = mock(MultipartFile.class);
		MultipartFile mockVideoFile = mock(MultipartFile.class);
		when(mockImageFile.getContentType()).thenReturn("image/png");
		when(mockVideoFile.getContentType()).thenReturn("video/mp4");
		List<MultipartFile> mediaDtoList = List.of(
				mockImageFile,
				mockImageFile,
				mockVideoFile);
		String content = "게시글 내용";
		when(boardMediaManager.uploadMedia(mockImageFile)).thenReturn("imagePath");
		when(boardMediaManager.uploadMedia(mockVideoFile)).thenReturn("videoPath");
		em.flush();
		em.clear();
		List<Species> speciesList = List.of(Species.CAT, Species.DOG, Species.ETC);

		//when
		Board board = boardService.createBoard(1L, speciesList, mediaDtoList, content, now);
		em.flush();
		em.clear();
		board = boardRepository.findById(1L).orElseThrow();
		member = memberRepository.findById(1L).orElseThrow();

		//then
		assertThat(board).isNotNull();
		assertThat(board.getMember()).isEqualTo(member);
		assertThat(board.getCategoryFilters()).hasSize(3);
		assertThat(board.getMediaList()).hasSize(3);
		assertThat(board.getContent()).isEqualTo(content);
		assertThat(board.getCreatedAt()).isEqualTo(now);
		assertThat(board.getUpdatedAt()).isEqualTo(now);
		assertThat(board.getVisibleScope()).isEqualTo(VisibleScope.PUBLIC);
		assertThat(board.getDeletedAt()).isNull();
	}

	@DisplayName("게시글을 삭제할 수 있다 - S3의 이미지도 삭제한다.")
	@Test
	void deleteBoard() {
		//given
		// TODO : 위의 데이터와 연동되므로, 데이터 분리 후 동일한 stubbing이 필요하다.
		LocalDateTime now = LocalDateTime.now();
		Member member = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		List<AnimalCategory> categoryList = animalCategoryRepository.saveAll(List.of(
				AnimalCategory.of(Species.CAT),
				AnimalCategory.of(Species.DOG),
				AnimalCategory.of(Species.ETC)));
		MultipartFile mockImageFile = mock(MultipartFile.class);
		MultipartFile mockVideoFile = mock(MultipartFile.class);
		when(mockImageFile.getContentType()).thenReturn("image/png");
		when(mockVideoFile.getContentType()).thenReturn("video/mp4");
		List<MultipartFile> mediaDtoList = List.of(
				mockImageFile,
				mockImageFile,
				mockVideoFile);
		String content = "게시글 내용";
		when(boardMediaManager.uploadMedia(mockImageFile)).thenReturn("imagePath");
		when(boardMediaManager.uploadMedia(mockVideoFile)).thenReturn("videoPath");
		em.flush();
		em.clear();
		List<Species> speciesList = List.of(Species.CAT, Species.DOG, Species.ETC);

		//when
		Board board = boardService.createBoard(1L, speciesList, mediaDtoList, content, now);
		em.flush();
		em.clear();
		List<BoardMedia> boardMediaList = boardMediaRepository.findAll();
		assertThat(boardMediaList).hasSize(3);
		List<BoardCategoryFilter> boardCategoryFilterList = boardCategoryFilterRepository.findAll();
		assertThat(boardCategoryFilterList).hasSize(3);
		boardService.deleteBoard(1L, 1L);

		//then
		then(boardMediaManager).should().deleteMediaByList(boardMediaList);
		assertThat(boardRepository.findById(1L)).isEmpty();
		assertThat(boardMediaRepository.findAll()).isEmpty();
		assertThat(boardCategoryFilterRepository.findAll()).isEmpty();
	}

	private Member stubMember(String nickname, MemberRole memberRole, LocalDateTime now) {
		OauthProfile oauthProfile = OauthProfile.of(OauthType.FORTY_TWO, "oauthId", "oauthName");
		return Member.of(oauthProfile,
				Country.KOREA,
				Country.Campus.SEOUL,
				nickname,
				"statement",
				memberRole,
				now);
	}
}