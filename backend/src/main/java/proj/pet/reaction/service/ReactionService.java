package proj.pet.reaction.service;

import proj.pet.reaction.dto.ReactionRequestDto;

public interface ReactionService {

	void createReaction(Long memberId, ReactionRequestDto reactionRequestDto);

	void deleteReaction(Long memberId, Long boardId);
}
