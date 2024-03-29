package proj.pet.board.service;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import proj.pet.block.repository.BlockRepository;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.repository.MemberCategoryFilterRepository;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.mapper.BoardMapper;
import proj.pet.member.domain.Member;
import proj.pet.testutil.test.UnitTest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.member.TestMember;

public class BoardQueryServiceImplTest extends UnitTest {

	private static final Long IGNORE_ID = 999L;
	@Mock
	private final BoardMapper boardMapper = BoardMapper.INSTANCE;
	@InjectMocks
	private BoardQueryServiceImpl boardQueryService;
	@Mock
	private BoardRepository boardRepository;
	@Mock
	private BlockRepository blockRepository;
	@Mock
	private MemberCategoryFilterRepository memberCategoryFilterRepository;
	@Mock
	private FollowRepository followRepository;

	@DisplayName("일반 게시글을 매핑해서 컨트롤러에게 전달한다.")
	@Test
	void getMainViewBoards() {
		//given
		Member author = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Member loginUser = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Page<Board> boards = new PageImpl<>(List.of(
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID),
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID)));
		PageRequest pageRequest = PageRequest.of(0, 10);
		given(boardRepository.getMainViewBoards(pageRequest)).willReturn(boards);
		given(blockRepository.findAllByMemberIdToList(loginUser.getId())).willReturn(List.of());

		//when
		boardQueryService.getMainViewBoards(loginUser.getId(), pageRequest);

		//then
		then(boardRepository).should().getMainViewBoards(pageRequest);
		then(boardMapper).should().toBoardsResponseDto(anyList(), eq(boards.getTotalElements()));
	}

	@DisplayName("핫 게시물을 매핑해서 컨트롤러에게 전달한다.")
	@Test
	void getHotBoards() {
		Member author = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Member loginUser = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Page<Board> boards = new PageImpl<>(List.of(
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID),
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID)));
		List<MemberCategoryFilter> memberCategoryFilters = List.of();
		PageRequest pageRequest = PageRequest.of(0, 10);
		given(memberCategoryFilterRepository.findAllByMemberIdWithJoin(loginUser.getId()))
				.willReturn(memberCategoryFilters);
		given(boardRepository.getHotBoards(pageRequest)).willReturn(boards);

		//when
		boardQueryService.getHotBoards(loginUser.getId(), pageRequest);

		//then
		then(boardRepository).should().getHotBoards(pageRequest);
		then(boardMapper).should().toBoardsResponseDto(anyList(), eq(boards.getTotalElements()));
	}

	@DisplayName("특정 멤버의 게시물을 매핑해서 컨트롤러에게 전달한다.")
	@Test
	void getMemberBoards() {
		Member author = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Member loginUser = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Page<Board> boards = new PageImpl<>(List.of(
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID),
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID)));
		PageRequest pageRequest = PageRequest.of(0, 10);
		given(boardRepository.getMemberBoards(author.getId(), pageRequest)).willReturn(boards);

		//when
		boardQueryService.getMemberBoards(loginUser.getId(), author.getId(), pageRequest);

		//then
		then(boardRepository).should().getMemberBoards(author.getId(), pageRequest);
		then(boardMapper).should().toBoardsResponseDto(anyList(), eq(boards.getTotalElements()));
	}

	@DisplayName("스크랩한 게시물을 매핑해서 컨트롤러에게 전달한다.")
	@Test
	void getScraps() {
		Member author = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Member loginUser = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Page<Board> boards = new PageImpl<>(List.of(
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID),
				TestBoard.builder()
						.member(author)
						.build().asMockEntity(IGNORE_ID)));
		PageRequest pageRequest = PageRequest.of(0, 10);
		given(boardRepository.getScrapBoards(loginUser.getId(), pageRequest)).willReturn(boards);

		//when
		boardQueryService.getScrapBoards(loginUser.getId(), pageRequest);

		//then
		then(boardRepository).should().getScrapBoards(loginUser.getId(), pageRequest);
		then(boardMapper).should().toBoardsResponseDto(anyList(), eq(boards.getTotalElements()));
	}

	@DisplayName("팔로잉한 멤버의 게시물을 매핑해서 컨트롤러에게 전달한다.")
	@Test
	void getFollowingsBoards() {
		Member following = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Member loginUser = TestMember.builder().build().asMockEntity(IGNORE_ID);
		Page<Board> boards = new PageImpl<>(List.of(
				TestBoard.builder()
						.member(following)
						.build().asMockEntity(IGNORE_ID),
				TestBoard.builder()
						.member(following)
						.build().asMockEntity(IGNORE_ID)));
		PageRequest pageRequest = PageRequest.of(0, 10);
		given(boardRepository.getFollowingsBoards(loginUser.getId(), pageRequest))
				.willReturn(boards);

		//when
		boardQueryService.getFollowingsBoards(loginUser.getId(), pageRequest);

		//then
		then(boardRepository).should().getFollowingsBoards(loginUser.getId(), pageRequest);
		then(boardMapper).should().toBoardsResponseDto(anyList(), eq(boards.getTotalElements()));
	}

}
