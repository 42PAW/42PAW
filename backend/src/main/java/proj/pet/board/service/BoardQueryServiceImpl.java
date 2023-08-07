package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.board.repository.BoardRepository;
import proj.pet.utils.annotations.QueryService;

@QueryService
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardQueryServiceImpl implements BoardQueryService {

	private final BoardRepository boardRepository;

	@Override public BoardsResponseDto getMainViewBoards(PageRequest pageRequest) {
		return null;
	}

	@Override public BoardsResponseDto getHotBoards(PageRequest pageRequest) {
		return null;
	}

	@Override public BoardsResponseDto getMemberBoards(PageRequest pageRequest, Long memberId) {
		return null;
	}
}
