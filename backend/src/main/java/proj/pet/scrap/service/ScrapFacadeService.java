package proj.pet.scrap.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.scrap.dto.ScrapCreateRequestDto;

public interface ScrapFacadeService {

	void createScrap(UserSessionDto userSessionDto, ScrapCreateRequestDto scrapCreateRequestDto);

	void deleteScrap(UserSessionDto userSessionDto, Long boardId);

	BoardsResponseDto getMyScraps(UserSessionDto userSessionDto, PageRequest pageRequest);
}
