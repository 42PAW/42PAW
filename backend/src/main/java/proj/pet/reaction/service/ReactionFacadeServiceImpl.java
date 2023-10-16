package proj.pet.reaction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.reaction.dto.ReactionRequestDto;

@Service
@RequiredArgsConstructor
public class ReactionFacadeServiceImpl implements ReactionFacadeService {

	private final ReactionService reactionService;
	private final ReactionEventPublisher reactionEventPublisher;

	@Override public void deleteReaction(UserSessionDto userSessionDto, Long boardId) {
		reactionService.deleteReaction(userSessionDto.getMemberId(), boardId);
	}

	@Override public void createReaction(UserSessionDto userSessionDto, ReactionRequestDto reactionRequestDto) {
		reactionService.createReaction(userSessionDto.getMemberId(), reactionRequestDto.getBoardId(), reactionRequestDto.getReactionType());
		reactionEventPublisher.publishByReactionCount(reactionRequestDto.getBoardId(), reactionRequestDto.getReactionType());
	}
}
