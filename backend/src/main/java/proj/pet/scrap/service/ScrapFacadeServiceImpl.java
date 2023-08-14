package proj.pet.scrap.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.service.BoardQueryService;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.scrap.dto.ScrapCreateRequestDto;
import proj.pet.scrap.dto.ScrapResponseDto;

@Service
@RequiredArgsConstructor
public class ScrapFacadeServiceImpl implements ScrapFacadeService {

	private final BoardQueryService boardQueryService;
	private final ScrapService scrapService;

	@Transactional
	@Override
	public void createScrap(UserSessionDto userSessionDto, ScrapCreateRequestDto scrapCreateRequestDto) {
		scrapService.createScrap(userSessionDto.getMemberId(), scrapCreateRequestDto.getBoardId());
	}

	@Transactional
	@Override
	public void deleteScrap(UserSessionDto userSessionDto, Long boardId) {

	}

	@Transactional(readOnly = true)
	@Override
	public ScrapResponseDto getMyScraps(UserSessionDto userSessionDto) {
		return null;
	}
}
