package proj.pet.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.pet.comment.domain.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
