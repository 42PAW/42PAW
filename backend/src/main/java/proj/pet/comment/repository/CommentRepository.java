package proj.pet.comment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.pet.comment.domain.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	@EntityGraph(attributePaths = {"member"})
	@Query("SELECT c " +
			"FROM Comment c " +
			"WHERE c.board.id = :boardId " +
			"ORDER BY c.createdAt ASC")
	Page<Comment> findDescOrderByBoardId(@Param("boardId") Long boardId, PageRequest pageRequest);
}
