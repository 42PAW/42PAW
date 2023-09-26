package proj.pet.scrap.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.board.service.BoardQueryService;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.scrap.dto.ScrapCreateRequestDto;

@Service
@RequiredArgsConstructor
public class ScrapFacadeServiceImpl implements ScrapFacadeService {

	private final BoardQueryService boardQueryService;
	private final ScrapService scrapService;

	@Transactional
	@Override
	public void createScrap(UserSessionDto userSessionDto,
			ScrapCreateRequestDto scrapCreateRequestDto) {
		scrapService.createScrap(userSessionDto.getMemberId(), scrapCreateRequestDto.getBoardId());
	}

	@Transactional
	@Override
	public void deleteScrap(UserSessionDto userSessionDto, Long boardId) {
		scrapService.deleteScrap(userSessionDto.getMemberId(), boardId);
	}

	@Transactional(readOnly = true)
	@Override
	public BoardsPaginationDto getMyScraps(UserSessionDto userSessionDto, PageRequest pageRequest) {
		return boardQueryService.getScrapBoards(userSessionDto.getMemberId(), pageRequest);
	}
}
