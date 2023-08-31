package proj.pet.board.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.domain.Board;

import java.util.List;

import static proj.pet.board.domain.QBoard.board;
import static proj.pet.scrap.domain.QScrap.scrap;

/**
 * QueryDSL을 사용하는 BoardRepository의 커스텀 구현체
 */
@RequiredArgsConstructor
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

	private static final Predicate EMPTY_PREDICATE = board.member.deletedAt.isNull();
	private final JPAQueryFactory queryFactory;

	/**
	 * 메인 화면에 보여줄 게시글 목록을 가져온다.
	 *
	 * @param pageRequest 페이지네이션
	 * @return 생성시각 기준으로 정렬된 {@link Board} 페이지네이션 - Page 아님
	 */
	@Override
	public List<Board> getMainViewBoards(PageRequest pageRequest) {
		return getBoardsWithFetchJoin(
				board.deletedAt.isNull(),
				board.createdAt.desc(),
				pageRequest);
	}

	/**
	 * 인기 게시글 목록을 가져온다.
	 *
	 * @param pageRequest 페이지네이션
	 * @return 반응 수 기준으로 정렬된 {@link Board} 페이지네이션 - Page 아님
	 */
	@Override
	public List<Board> getHotBoards(PageRequest pageRequest) {
		return getBoardsWithFetchJoin(
				board.deletedAt.isNull(),
				board.reactions.size().desc(),
				pageRequest);
	}

	/**
	 * 특정 멤버가 작성한 게시글 목록을 가져온다.
	 *
	 * @param memberId    특정 멤버 ID
	 * @param pageRequest 페이지네이션
	 * @return 해당 멤버의 생성시각 기준으로 정렬된 {@link Board} 페이지네이션 - Page 아님
	 */
	@Override
	public List<Board> getMemberBoards(Long memberId, PageRequest pageRequest) {
		return getBoardsWithFetchJoin(
				board.member.id.eq(memberId)
						.and(board.deletedAt.isNull()),
				board.createdAt.desc(),
				pageRequest);
	}

	/**
	 * 로그인한 사용자의 스크랩한 게시글 목록을 가져온다.
	 *
	 * @param loginUserId 로그인한 멤버 ID
	 * @param pageRequest 페이지네이션
	 * @return 해당 멤버의 생성시각 기준으로 정렬된 {@link Board} 페이지네이션 - Page 아님
	 */
	@Override
	public List<Board> getScrapBoards(Long loginUserId, PageRequest pageRequest) {
		return queryFactory
				.select(board)
				.from(scrap)
				.join(scrap.board, board)
				.where(scrap.member.id.eq(loginUserId)
						.and(board.deletedAt.isNull()))
				.orderBy(board.createdAt.desc())
				.offset(pageRequest.getOffset())
				.limit(pageRequest.getPageSize())
				.fetch();
	}

	/**
	 * 사용자가 팔로우한 멤버들의 게시글 목록을 가져온다.
	 *
	 * @param memberId    특정 멤버 ID
	 * @param pageRequest 페이지네이션
	 * @return 해당 멤버의 생성시각 기준으로 정렬된 {@link Board} 페이지네이션 - Page 아님
	 */
	@Override
	public List<Board> getFollowingsBoards(Long memberId, PageRequest pageRequest) {
		return getBoardsWithFetchJoin(
				board.member.followers.any().id.memberId.eq(memberId)
						.and(board.deletedAt.isNull()),
				board.createdAt.desc(),
				pageRequest);
	}

	/**
	 * predicate와 orderSpecifier 조건을 만족하는 {@link Board} List를 조회한다.
	 *
	 * @param predicate      where 조건
	 * @param orderSpecifier 정렬 조건
	 * @param pageRequest    페이지네이션
	 * @return {@link Board} 페이지네이션 - Page 아님
	 */
	private List<Board> getBoardsWithFetchJoin(Predicate predicate,
	                                           OrderSpecifier<?> orderSpecifier, PageRequest pageRequest) {
		return queryFactory.selectFrom(board)
				.where(predicate)
				.orderBy(orderSpecifier)
				.orderBy(board.createdAt.desc())
				.join(board.member).fetchJoin()
//				.join(board.comments).fetchJoin()
//				.join(board.reactions)
//				.join(board.mediaList).fetchJoin()
//				.join(board.scraps).fetchJoin()
				.offset(pageRequest.getOffset())
				.limit(pageRequest.getPageSize())
				.fetch();
	}
	//TODO : https://jojoldu.tistory.com/457 / N+1을 피하는 방법 찾아보기

	@Override
	public long countByMemberId(Long memberId) {
		return queryFactory.select(board.count())
				.from(board)
				.where(board.member.id.eq(memberId)
						.and(board.deletedAt.isNull()))
				.fetchFirst();
	}
}
