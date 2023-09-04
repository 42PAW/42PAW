package proj.pet.board.repository;

import java.util.List;
import org.springframework.data.domain.PageRequest;
import proj.pet.block.domain.Block;
import proj.pet.board.domain.Board;
import proj.pet.category.domain.BoardCategoryFilter;

public interface BoardRepositoryCustom {

	List<Board> getMainViewBoards(
			List<Block> blocks, List<BoardCategoryFilter> categories, PageRequest pageRequest);

	List<Board> getHotBoards(
			List<Block> blocks, List<BoardCategoryFilter> categories, PageRequest pageRequest);

	List<Board> getMemberBoards(Long memberId, PageRequest pageRequest);

	List<Board> getScrapBoards(Long loginUserId, PageRequest pageRequest);

	List<Board> getFollowingsBoards(Long memberId, PageRequest pageRequest);

	long countByMemberId(Long memberId);

}
