package proj.pet.board.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.domain.Board;

import java.util.List;

import static proj.pet.board.domain.QBoard.board;

@RequiredArgsConstructor
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override public List<Board> getMainViewBoards(PageRequest pageRequest) {
		Predicate predicate = null;
		OrderSpecifier<?> orderSpecifier = board.createdAt.desc();
		return getBoards(predicate, orderSpecifier, pageRequest);
	}

	@Override public List<Board> getHotBoards(PageRequest pageRequest) {
		return null;
	}

	@Override public List<Board> getMemberBoards(Long memberId, PageRequest pageRequest) {
		return null;
	}

	private List<Board> getBoards(Predicate predicate, OrderSpecifier<?> orderSpecifier, PageRequest pageRequest) {
		return queryFactory.selectFrom(board)
				.where(predicate)
				.orderBy(orderSpecifier)
				.offset(pageRequest.getOffset())
				.limit(pageRequest.getPageSize())
				.fetch();
	}
}
