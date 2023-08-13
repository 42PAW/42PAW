package proj.pet.reaction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.reaction.dto.ReactionRequestDto;

@Service
@RequiredArgsConstructor
public class ReactionFacadeServiceImpl implements ReactionFacadeService {

	private final ReactionService reactionService;

	@Transactional
	@Override public void createReaction(UserSessionDto userSessionDto, ReactionRequestDto reactionRequestDto) {
		reactionService.createReaction(userSessionDto.getMemberId(), reactionRequestDto);
	}

	@Transactional
	@Override public void deleteReaction(UserSessionDto userSessionDto, Long boardId) {
		reactionService.deleteReaction(userSessionDto.getMemberId(), boardId);
	}
}
