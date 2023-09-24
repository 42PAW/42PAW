package proj.pet.report.service;

import static proj.pet.exception.ExceptionStatus.ALREADY_BLOCKED_MEMBER;
import static proj.pet.exception.ExceptionStatus.ALREADY_REPORTED_MEMBER;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_BOARD;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_COMMENT;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.exception.ExceptionStatus;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.report.domain.Report;
import proj.pet.report.domain.ReportReason;
import proj.pet.report.repository.ReportRepository;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final ReportRepository reportRepository;
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final CommentRepository commentRepository;

	@Override
	public void createReport(Long memberId, Long boardId, Long reportedMemberId, Long commentId,
			ReportReason reason, String content, LocalDateTime now) {
		Member from = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Member to = memberRepository.findById(reportedMemberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		if (boardId == null) {
			boolean memberReported = reportRepository.findReportByMemberId(reportedMemberId)
					.isPresent();
			if (memberReported) {
				throw new ServiceException(ALREADY_REPORTED_MEMBER);
			}
			Report entity = Report.ofMember(from, to, reason, content, now);
			reportRepository.save(entity);
		} else {
			boolean boardReported = reportRepository.findReportByBoardId(reportedMemberId, boardId)
					.isPresent();
			if (boardReported) {
				throw new ServiceException(ALREADY_BLOCKED_MEMBER);
			}
			Board board = boardRepository.findById(boardId)
					.orElseThrow(NOT_FOUND_BOARD::asServiceException);
			if (commentId == null) {
				reportRepository.save(
						Report.ofBoard(from, to, board.getId(), reason, content, now));
			} else {
				boolean commentReported = reportRepository
						.findReportByCommentId(reportedMemberId, boardId, commentId).isPresent();
				if (commentReported) {
					throw new ServiceException(ExceptionStatus.ALREADY_REPORTED_COMMENT);
				}
				Comment comment = commentRepository.findById(commentId)
						.orElseThrow(NOT_FOUND_COMMENT::asServiceException);
				reportRepository.save(
						Report.ofComment(
								from, to, board.getId(), comment.getId(), reason, content, now));
			}
		}
	}
}
