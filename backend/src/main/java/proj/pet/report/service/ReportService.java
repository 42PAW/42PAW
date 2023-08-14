package proj.pet.report.service;

import proj.pet.report.domain.ReportReason;

import java.time.LocalDateTime;

public interface ReportService {
	void createReport(Long memberId, Long boardId, Long reportedMemberId, Long commentId, ReportReason reason, String content, LocalDateTime now);
}
