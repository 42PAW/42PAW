package proj.pet.report.service;

import proj.pet.member.dto.UserSessionDto;
import proj.pet.report.dto.ReportRequestDto;

public interface ReportFacadeService {

	void createReport(UserSessionDto userSessionDto, ReportRequestDto reportRequestDto);
}
