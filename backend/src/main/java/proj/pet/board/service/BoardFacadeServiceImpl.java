package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
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

	//TODO: PROD에서 성능 테스트 후 둘 중 하나 삭제
	@Override
	public BoardsPaginationDto getMainViewBoards(UserSessionDto userSessionDto,
	                                             PageRequest pageRequest) {
		return boardQueryService.getMainViewBoards(userSessionDto.getMemberId(), pageRequest);
	}

	@Override
	public BoardsPaginationDto getHotBoards(UserSessionDto userSessionDto,
	                                        PageRequest pageRequest) {
		return boardQueryService.getHotBoards(userSessionDto.getMemberId(), pageRequest);
	}

	@Override
	public BoardsPaginationDto getMemberBoards(UserSessionDto userSessionDto, Long memberId,
	                                           PageRequest pageRequest) {
		return boardQueryService.getMemberBoards(userSessionDto.getMemberId(), memberId,
				pageRequest);
	}

	@Override
	public BoardsPaginationDto getFollowingsBoards(UserSessionDto userSessionDto,
	                                               PageRequest pageRequest) {
		return boardQueryService.getFollowingsBoards(userSessionDto.getMemberId(), pageRequest);
	}


	@Override
	public void createBoard(UserSessionDto userSessionDto, List<String> mediaUrlList, List<Species> categoryList, String content) {
		boardService.createBoard(userSessionDto.getMemberId(),
				categoryList,
				mediaUrlList,
				content,
				LocalDateTime.now());
	}

	@Override
	public void deleteBoard(UserSessionDto userSessionDto, Long boardId) {
		boardService.deleteBoard(userSessionDto.getMemberId(), boardId);
	}

	@Override
	public BoardInfoDto getBoard(UserSessionDto userSessionDto, Long boardId) {
		return boardQueryService.getBoard(userSessionDto.getMemberId(), boardId);
	}
}
