package proj.pet.reaction.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.reaction.domain.Reaction;
import proj.pet.reaction.domain.ReactionType;
import proj.pet.reaction.repository.ReactionRepository;

import java.time.LocalDateTime;

import static proj.pet.exception.ExceptionStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
public class ReactionServiceImpl implements ReactionService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;
	private final ReactionRepository reactionRepository;

	@Override public void createReaction(Long loginUserId, Long boardId, ReactionType reactionType) {
		Member loginUser = memberRepository.findById(loginUserId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = boardRepository.findById(boardId).orElseThrow(NOT_FOUND_BOARD::asServiceException);
		reactionRepository.save(Reaction.of(board, loginUser, reactionType, LocalDateTime.now()));
	}

	/**
	 * 게시글에 대한 반응 삭제
	 *
	 * @param loginUserId 로그인 유저 아이디
	 * @param boardId     게시글 아이디
	 */
	@Override public void deleteReaction(Long loginUserId, Long boardId) {
		Member loginUser = memberRepository.findById(loginUserId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = boardRepository.findById(boardId).orElseThrow(NOT_FOUND_BOARD::asServiceException);
		Reaction reaction = reactionRepository.findByBoardAndMember(board.getId(), loginUser.getId())
				.orElseThrow(NOT_FOUND_REACTION::asServiceException);
		reactionRepository.delete(reaction);
	}
}
