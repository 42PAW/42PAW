package proj.pet.board.repository;

import java.util.List;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.domain.Board;

public interface BoardRepositoryCustom {

	List<Board> getMainViewBoards(PageRequest pageRequest);

	List<Board> getHotBoards(PageRequest pageRequest);

	List<Board> getMemberBoards(Long memberId, PageRequest pageRequest);

	List<Board> getScrapBoards(Long loginUserId, PageRequest pageRequest);

	long countByMemberId(Long memberId);
}
