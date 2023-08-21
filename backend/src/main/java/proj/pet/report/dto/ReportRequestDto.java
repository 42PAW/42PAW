package proj.pet.report.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.report.domain.ReportReason;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@ToString
public class ReportRequestDto {

	private Long reportedMemberId;
	private Long boardId;
	private Long commentId;
	private ReportReason reason;
	private String content;
}
