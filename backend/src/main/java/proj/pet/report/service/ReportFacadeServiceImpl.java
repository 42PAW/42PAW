package proj.pet.report.service;

import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.report.dto.ReportRequestDto;

@Service
@RequiredArgsConstructor
public class ReportFacadeServiceImpl implements ReportFacadeService {

	private final ReportService reportService;

	@Override
	public void createReport(UserSessionDto userSessionDto, ReportRequestDto reportRequestDto) {

		reportService.createReport(userSessionDto.getMemberId(),
				reportRequestDto.getBoardId(), reportRequestDto.getReportedMemberId(),
				reportRequestDto.getCommentId(),
				reportRequestDto.getReason(), reportRequestDto.getContent(), LocalDateTime.now());
	}
}
