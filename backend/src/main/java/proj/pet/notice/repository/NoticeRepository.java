package proj.pet.notice.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proj.pet.notice.domain.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

	List<Notice> findAllByReceiverId(Long receiverId);

	@Query("SELECT n " +
			"FROM Notice n " +
			"WHERE n.readAt IS NULL")
	List<Notice> findAllUnreadByReceiverId(Long receiverId);

	void deleteAllByCreatedAtBefore(LocalDateTime date);
}
