package proj.pet.reaction.service;

import proj.pet.reaction.domain.ReactionType;

public interface ReactionService {

	void createReaction(Long memberId, Long boardId, ReactionType reactionType);

	void deleteReaction(Long memberId, Long boardId);
}
