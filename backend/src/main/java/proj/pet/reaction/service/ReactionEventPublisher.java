package proj.pet.reaction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.notice.domain.NoticeType;
import proj.pet.notice.service.NoticeEventPublisher;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.reaction.repository.ReactionRepository;

import static proj.pet.exception.ExceptionStatus.INVALID_ARGUMENT;

@Component
@RequiredArgsConstructor
public class ReactionEventPublisher {
	private final NoticeEventPublisher noticeEventPublisher;
	private final BoardRepository boardRepository;
	private final ReactionRepository reactionRepository;

	@Transactional
	public void publishByReactionCount(Long boardId, ReactionType reactionType) {
		if (reactionType.equals(ReactionType.LIKE)) {
			Long count = reactionRepository.countByBoardId(boardId);
			NoticeType noticeType = getNoticeTypeByCount(count);
			Board board = boardRepository.findById(boardId).orElseThrow(INVALID_ARGUMENT::asServiceException);
			if (noticeType != null)
				noticeEventPublisher.publish(noticeType, board.getMember().getId(), board);
		}
	}

	private NoticeType getNoticeTypeByCount(Long reactionCount) {
		if (reactionCount == 10)
			return NoticeType.REACTION_TEN;
		else if (reactionCount == 42)
			return NoticeType.REACTION_FORTY_TWO;
		else if (reactionCount == 100)
			return NoticeType.REACTION_ONE_HUNDRED;
		return null;
	}
}
