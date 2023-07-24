package proj.pet.report.service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.utils.annotations.QueryService;

@QueryService
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportQueryServiceImpl implements ReportQueryService {
}
