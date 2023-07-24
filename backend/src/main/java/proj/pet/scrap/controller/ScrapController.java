package proj.pet.scrap.controller;

import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.scrap.dto.ScrapResponseDto;
import proj.pet.scrap.service.ScrapFacadeService;

@RestController("/v1/scraps")
@RequiredArgsConstructor
public class ScrapController {

	private final ScrapFacadeService scrapFacadeService;

	@GetMapping("/members/me")
	public ScrapResponseDto getMyScraps() {
		return scrapFacadeService.getMyScraps();
	}

	@PostMapping("/")
	public void createScrap(@RequestBody HashMap<String, Long> body) {
		scrapFacadeService.createScrap(body.get("boardId"));
	}

	@DeleteMapping("/boards/{boardId}")
	public void deleteScrap(@PathVariable Long boardId) {
		scrapFacadeService.deleteScrap(boardId);
	}
}
