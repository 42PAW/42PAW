package proj.pet.report.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.report.domain.Report;
import proj.pet.report.domain.ReportReason;
import proj.pet.report.repository.ReportRepository;

import java.time.LocalDateTime;

import static proj.pet.exception.ExceptionStatus.*;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final ReportRepository reportRepository;
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;

	@Override public void createReport(Long memberId, Long boardId, Long reportedMemberId, Long commentId, ReportReason reason, String content, LocalDateTime now) {
		Member from = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Member to = memberRepository.findById(reportedMemberId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = null;
		Comment comment = null;
		if (boardId != null) {
			board = boardRepository.findById(boardId).orElseThrow(NOT_FOUND_BOARD::asServiceException);
		}
		if (commentId != null) {
			comment = commentRepository.findById(commentId).orElseThrow(NOT_FOUND_COMMENT::asServiceException);
		}
		reportRepository.save(
				Report.builder()
						.from(from).to(to)
						.board(board)
						.comment(comment)
						.reason(reason)
						.content(content)
						.now(now)
						.build());
	}
}
