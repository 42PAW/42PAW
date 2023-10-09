package proj.pet.notice.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.notice.domain.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

	Page<Notice> findAllByReceiverId(Long receiverId, PageRequest pageRequest);
}
