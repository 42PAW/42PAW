package proj.pet.reaction.service;

import proj.pet.member.dto.UserSessionDto;
import proj.pet.reaction.dto.ReactionRequestDto;

public interface ReactionFacadeService {

	void createReaction(UserSessionDto userSessionDto, ReactionRequestDto reactionRequestDto);

	void deleteReaction(UserSessionDto userSessionDto, Long boardId);
}
