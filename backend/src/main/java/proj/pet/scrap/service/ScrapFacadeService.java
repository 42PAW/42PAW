package proj.pet.scrap.service;

import proj.pet.member.dto.UserSessionDto;
import proj.pet.scrap.dto.ScrapCreateRequestDto;
import proj.pet.scrap.dto.ScrapResponseDto;

public interface ScrapFacadeService {

	void createScrap(UserSessionDto userSessionDto, ScrapCreateRequestDto scrapCreateRequestDto);

	void deleteScrap(UserSessionDto userSessionDto, Long boardId);

	ScrapResponseDto getMyScraps(UserSessionDto userSessionDto);
}
