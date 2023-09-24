package proj.pet.report.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proj.pet.report.domain.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

	@Query("SELECT r " +
			"FROM Report r " +
			"WHERE r.to.id = :memberId " +
			"AND r.boardId IS NULL " +
			"AND r.commentId IS NULL")
	Optional<Report> findReportByMemberId(Long memberId);

	@Query("SELECT r " +
			"FROM Report r " +
			"WHERE r.to.id = :memberId " +
			"AND r.boardId = :boardId " +
			"AND r.commentId IS NULL")
	Optional<Report> findReportByBoardId(Long memberId, Long boardId);

	@Query("SELECT r " +
			"FROM Report r " +
			"WHERE r.to.id = :memberId " +
			"AND r.boardId = :boardId " +
			"AND r.commentId = :commentId")
	Optional<Report> findReportByCommentId(Long memberId, Long boardId, Long commentId);
}
