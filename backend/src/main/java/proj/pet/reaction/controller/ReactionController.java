package proj.pet.reaction.controller;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.reaction.service.ReactionFacadeService;

@RestController("/v1/reactions")
@RequiredArgsConstructor
public class ReactionController {

	private final ReactionFacadeService reactionFacadeService;

	@PostMapping("/")
	public void createReaction(@RequestBody Map<String, Long> body) {
		reactionFacadeService.createReaction(body.get("boardId"));
	}

	@DeleteMapping("/boards/{boardId}")
	public void deleteReaction(@PathVariable("boardId") Long boardId) {
		reactionFacadeService.deleteReaction();
	}
}
