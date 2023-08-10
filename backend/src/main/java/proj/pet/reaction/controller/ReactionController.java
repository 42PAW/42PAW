package proj.pet.reaction.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj.pet.reaction.service.ReactionFacadeService;

import java.util.Map;

@RestController
@RequestMapping("/v1/reactions")
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
