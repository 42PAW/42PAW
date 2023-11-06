package proj.pet.comment.service;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_BOARD;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.notice.domain.NoticeType;
import proj.pet.notice.service.NoticeEventPublisher;

@Component
@RequiredArgsConstructor
public class CommentEventPublisher {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final NoticeEventPublisher noticeEventPublisher;

	@Transactional
	public void publish(Long boardId, Long commenterId, String content) {
		Board board = boardRepository.findById(boardId)
				.orElseThrow(NOT_FOUND_BOARD::asServiceException);
		Member commenter = memberRepository.findById(commenterId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		commentEventPublish(commenterId, board, commenter);
		commentTagEventPublish(commenterId, content, board, commenter);
	}

	private void commentEventPublish(Long commenterId, Board board, Member commenter) {
		Long receiverId = board.getMember().getId();
		if (!commenterId.equals(receiverId)) {
			noticeEventPublisher.publish(NoticeType.NEW_BOARD_COMMENT, receiverId, board,
					commenter);
		}
	}

	private void commentTagEventPublish(Long commenterId, String content, Board board,
			Member commenter) {
		int tagIndex = content.indexOf('@');
		while (tagIndex != -1) {
			int spaceIndex = content.indexOf(' ', tagIndex);
			String tag = content.substring(tagIndex + 1,
					spaceIndex == -1 ? content.length() : spaceIndex);
			Member taggedMember = memberRepository.findByNickname(tag).orElse(null);
			if (taggedMember != null && taggedMember.getId() != null
					&& !taggedMember.getId().equals(commenterId)) {
				noticeEventPublisher.publish(NoticeType.NEW_COMMENT_TAG, taggedMember.getId(),
						board, commenter);
			}
			tagIndex = content.indexOf('@', tagIndex + 1);
		}
	}
}
