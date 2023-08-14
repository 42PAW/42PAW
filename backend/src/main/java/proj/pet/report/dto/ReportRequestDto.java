package proj.pet.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.report.domain.ReportReason;

@AllArgsConstructor
@Getter
public class ReportRequestDto {
	private final Long reportedMemberId;
	private final Long boardId;
	private final Long commentId;
	private final ReportReason reason;
	private final String content;
}
