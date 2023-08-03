package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import proj.pet.board.dto.BoardCreateRequestDto;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.dto.UserSession;

@Service
@RequiredArgsConstructor
public class BoardFacadeServiceImpl implements BoardFacadeService {

	private final BoardService boardService;
	private final BoardQueryService boardQueryService;

	@Override
	public BoardsResponseDto getMainViewBoards(PageRequest pageRequest) {
		return boardQueryService.getMainViewBoards(pageRequest);
	}

	@Override
	public BoardsResponseDto getHotBoards(PageRequest pageRequest) {
		return boardQueryService.getHotBoards(pageRequest);
	}

	@Override
	public BoardsResponseDto getMemberBoards(PageRequest pageRequest, Long memberId) {
		return boardQueryService.getMemberBoards(pageRequest, memberId);
	}

	@Override
	public void createBoard(UserSession userSession, BoardCreateRequestDto boardCreateRequestDto) {
		boardService.createBoard(userSession.getMemberId(),
				boardCreateRequestDto.getCategoryList(),
				boardCreateRequestDto.getMediaDataList(),
				boardCreateRequestDto.getContent());
	}

	@Override
	public void deleteBoard(UserSession userSession, Long boardId) {
		boardService.deleteBoard(userSession.getMemberId(), boardId);
	}
}
