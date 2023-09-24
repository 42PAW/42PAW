package proj.pet.board.repository;

import java.util.List;
import proj.pet.board.dto.BoardViewSubDto;

public interface BoardViewRepository {

	BoardViewSubDto getBoardViewWithBoardIdList(Long loginUserId, List<Long> boardIdList);
}
