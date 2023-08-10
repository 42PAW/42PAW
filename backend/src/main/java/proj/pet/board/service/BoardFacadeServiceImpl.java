package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.category.domain.Species;
import proj.pet.member.dto.UserSessionDto;

import java.time.LocalDateTime;
import java.util.List;

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
	public void createBoard(UserSessionDto userSessionDto, List<MultipartFile> mediaDataList, List<Species> categoryList, String content) {
		boardService.createBoard(userSessionDto.getMemberId(),
				categoryList,
				mediaDataList,
				content,
				LocalDateTime.now());
	}

	@Override
	public void deleteBoard(UserSessionDto userSessionDto, Long boardId) {
		boardService.deleteBoard(userSessionDto.getMemberId(), boardId);
	}
}
