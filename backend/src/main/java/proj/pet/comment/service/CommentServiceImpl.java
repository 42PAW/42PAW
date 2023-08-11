package proj.pet.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_BOARD;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;

	@Override public void addCommentToBoard(Long loginUserId, Long boardId, String content, LocalDateTime now) {
		Member member = memberRepository.findById(loginUserId).orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		Board board = boardRepository.findById(boardId).orElseThrow(NOT_FOUND_BOARD::toServiceException);
		commentRepository.save(Comment.of(board, member, content, now));
	}
}
