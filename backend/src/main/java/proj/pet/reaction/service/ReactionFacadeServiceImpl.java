package proj.pet.reaction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReactionFacadeServiceImpl implements ReactionFacadeService {

	private final ReactionService reactionService;

	@Override
	public void createReaction() {
	}

	@Override
	public void deleteReaction() {
	}
}
