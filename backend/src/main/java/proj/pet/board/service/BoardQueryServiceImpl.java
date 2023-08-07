package proj.pet.board.service;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.QBoard;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.repository.BoardRepository;
import proj.pet.utils.annotations.QueryService;

@QueryService
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardQueryServiceImpl implements BoardQueryService {

	private final BoardRepository boardRepository;

	@Override public BoardsResponseDto getMainViewBoards(PageRequest pageRequest) {
		Predicate filter = null;
		OrderSpecifier<?> orderSpecifier = QBoard.board.createdAt.desc();
		return null;
	}

	@Override public BoardsResponseDto getHotBoards(PageRequest pageRequest) {
		Predicate filter = null;
		OrderSpecifier<?> orderSpecifier = QBoard.board.createdAt.desc(); // Like Count
		return null;
	}

	@Override public BoardsResponseDto getMemberBoards(PageRequest pageRequest, Long memberId) {
		Predicate filter = QBoard.board.member.id.eq(memberId);
		OrderSpecifier<?> orderSpecifier = QBoard.board.createdAt.desc();
		return null;
	}
}
