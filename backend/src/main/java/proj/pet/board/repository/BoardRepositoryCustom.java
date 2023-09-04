package proj.pet.board.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import proj.pet.board.domain.Board;

public interface BoardRepositoryCustom {

	Page<Board> getMainViewBoards(PageRequest pageRequest);

	Page<Board> getHotBoards(PageRequest pageRequest);

	Page<Board> getMemberBoards(Long memberId, PageRequest pageRequest);

	List<Board> getScrapBoards(Long loginUserId, PageRequest pageRequest);

	Page<Board> getFollowingsBoards(Long memberId, PageRequest pageRequest);

	long countByMemberId(Long memberId);

}
