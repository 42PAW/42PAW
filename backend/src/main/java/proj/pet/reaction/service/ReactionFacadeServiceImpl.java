package proj.pet.reaction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.reaction.dto.ReactionRequestDto;

@Service
@RequiredArgsConstructor
public class ReactionFacadeServiceImpl implements ReactionFacadeService {

	private final ReactionService reactionService;

	@Override public void createReaction(UserSessionDto userSessionDto, ReactionRequestDto reactionRequestDto) {

	}

	@Override public void deleteReaction(UserSessionDto userSessionDto, Long boardId) {

	}
}
