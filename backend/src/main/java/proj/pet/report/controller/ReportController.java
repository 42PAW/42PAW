package proj.pet.report.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.report.dto.ReportRequestDto;
import proj.pet.report.service.ReportFacadeService;

@RestController("/v1/reports")
@RequiredArgsConstructor
public class ReportController {

	private final ReportFacadeService reportFacadeService;

	@PostMapping("/")
	public void createReport(@RequestBody ReportRequestDto reportRequestDto) {
		reportFacadeService.createReport(reportRequestDto);
	}
}
