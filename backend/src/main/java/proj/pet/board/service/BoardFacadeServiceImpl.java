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

/**
 * 컨트롤러의 요청을 처리하는 서비스 로직들을 응집하는 구현체
 */
@Service
@RequiredArgsConstructor
public class BoardFacadeServiceImpl implements BoardFacadeService {

	private final BoardService boardService;
	private final BoardQueryService boardQueryService;

	@Override
	public BoardsResponseDto getMainViewBoards(UserSessionDto userSessionDto, PageRequest pageRequest) {
		return boardQueryService.getMainViewBoards(userSessionDto.getMemberId(), pageRequest);
	}

	@Override
	public BoardsResponseDto getHotBoards(UserSessionDto userSessionDto, PageRequest pageRequest) {
		return boardQueryService.getHotBoards(userSessionDto.getMemberId(), pageRequest);
	}

	@Override
	public BoardsResponseDto getMemberBoards(UserSessionDto userSessionDto, Long memberId, PageRequest pageRequest) {
		return boardQueryService.getMemberBoards(userSessionDto.getMemberId(), memberId, pageRequest);
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
