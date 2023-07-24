package proj.pet.reaction.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.reaction.service.ReactionFacadeService;

@RestController("/v1/reactions")
@RequiredArgsConstructor
public class ReactionController {

	private final ReactionFacadeService reactionFacadeService;

	@PostMapping("/")
	public void createReaction() {
		reactionFacadeService.createReaction();
	}

	@DeleteMapping("/boards/{boardId}")
	public void deleteReaction(@PathVariable("boardId") Long boardId) {
		reactionFacadeService.deleteReaction();
	}
}
