package proj.pet.scrap.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.scrap.dto.ScrapCreateRequestDto;

public interface ScrapFacadeService {

	void createScrap(UserSessionDto userSessionDto, ScrapCreateRequestDto scrapCreateRequestDto);

	void deleteScrap(UserSessionDto userSessionDto, Long boardId);

	BoardsPaginationDto getMyScraps(UserSessionDto userSessionDto, PageRequest pageRequest);

	BoardsPaginationDto getMyScrapsRefactoring(UserSessionDto userSessionDto,
			PageRequest pageRequest);
}
