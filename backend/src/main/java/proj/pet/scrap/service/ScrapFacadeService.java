package proj.pet.scrap.service;

import proj.pet.scrap.dto.ScrapResponseDto;

public interface ScrapFacadeService {

	void createScrap(Long boardId);

	void deleteScrap(Long boardId);

	ScrapResponseDto getMyScraps();
}
