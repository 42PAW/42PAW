package proj.pet.report.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.pet.auth.domain.AuthGuard;
import proj.pet.auth.domain.AuthLevel;
import proj.pet.member.domain.UserSession;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.report.dto.ReportRequestDto;
import proj.pet.report.service.ReportFacadeService;

@RestController
@RequestMapping("/v1/reports")
@RequiredArgsConstructor
public class ReportController {

	private final ReportFacadeService reportFacadeService;

	@PostMapping
	@AuthGuard(level = AuthLevel.USER_OR_ADMIN)
	public void createReport(
			@UserSession UserSessionDto userSessionDto,
			@RequestBody ReportRequestDto reportRequestDto) {
		reportFacadeService.createReport(userSessionDto, reportRequestDto);
	}
}
