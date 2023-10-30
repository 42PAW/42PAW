package proj.pet.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.notice.domain.Notice;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

	@Query("SELECT n " +
			"FROM Notice n " +
			"WHERE n.receiverId = :receiverId " +
			"ORDER BY n.createdAt DESC")
	List<Notice> findAllByReceiverId(@Param("receiverId") Long receiverId);

	@Query("SELECT n " +
			"FROM Notice n " +
			"WHERE n.readAt IS NULL AND n.receiverId = :receiverId " +
			"ORDER BY n.createdAt DESC")
	List<Notice> findAllUnreadByReceiverId(@Param("receiverId") Long receiverId);

	void deleteAllByCreatedAtBefore(LocalDateTime date);
}
