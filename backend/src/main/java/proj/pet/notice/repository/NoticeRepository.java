package proj.pet.notice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proj.pet.notice.domain.Notice;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

	Page<Notice> findAllByReceiverId(Long receiverId, PageRequest pageRequest);

	@Query("SELECT n " +
			"FROM Notice n " +
			"WHERE n.readAt IS NULL")
	List<Notice> findAllUnreadByReceiverId(Long receiverId);

	void deleteAllByCreatedAtBefore(LocalDateTime date);
}
