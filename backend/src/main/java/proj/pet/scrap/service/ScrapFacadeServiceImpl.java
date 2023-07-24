package proj.pet.scrap.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.scrap.dto.ScrapResponseDto;

@Service
@RequiredArgsConstructor
public class ScrapFacadeServiceImpl implements ScrapFacadeService {

	private final ScrapService scrapService;

	@Override
	public void createScrap(Long boardId) {

	}

	@Override
	public void deleteScrap(Long boardId) {

	}

	@Override
	public ScrapResponseDto getMyScraps() {
		return null;
	}
}
