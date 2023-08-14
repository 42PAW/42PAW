package proj.pet.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.report.domain.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
}
