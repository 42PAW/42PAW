package proj.pet.comment.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.exception.ServiceException;
import proj.pet.member.domain.*;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class CommentServiceTest {

	@Autowired
	private CommentService commentService;

	@Autowired
	private EntityManager em;

	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private CommentRepository commentRepository;

	@DisplayName("사용자가 게시물에 댓글을 작성할 수 있다.")
	@Test
	void addCommentToBoard() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member author = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		Member loginUser = memberRepository.save(stubMember("hyungnoh", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(author, VisibleScope.PUBLIC, "content", now));
		em.flush();
		em.clear();

		//when
		commentService.addCommentToBoard(loginUser.getId(), board.getId(), "이것은 댓글이여", LocalDateTime.now());

		//then
		Comment comment = commentRepository.findById(1L).get();
		assertThat(comment.getMember().getId()).isEqualTo(loginUser.getId());
		assertThat(comment.getBoard().getId()).isEqualTo(board.getId());
		assertThat(comment.getContent()).isEqualTo("이것은 댓글이여");
		assertThat(comment.getCreatedAt()).isNotNull();
	}

	@DisplayName("본인이 작성한 댓글을 지울 수 있다.")
	@Test
	void deleteComment() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member author = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		Member loginUser = memberRepository.save(stubMember("hyungnoh", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(author, VisibleScope.PUBLIC, "content", now));
		commentRepository.save(Comment.of(board, loginUser, "이것은 댓글이여", now));
		em.flush();
		em.clear();

		//when
		commentService.deleteComment(loginUser.getId(), 1L);

		//then
		assertThat(commentRepository.findById(1L)).isEmpty();
	}

	@DisplayName("본인이 작성하지 않은 댓글은 지울 수 없다.")
	@Test
	void deleteComment2() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member author = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		Member loginUser = memberRepository.save(stubMember("hyungnoh", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(author, VisibleScope.PUBLIC, "content", now));
		commentRepository.save(Comment.of(board, author, "이것은 댓글이여", now));
		em.flush();
		em.clear();

		//when, then
		assertThatThrownBy(() -> commentService.deleteComment(loginUser.getId(), 1L))
				.isInstanceOf(ServiceException.class);
	}

	private Member stubMember(String nickname, MemberRole memberRole, LocalDateTime now) {
		OauthProfile oauthProfile = OauthProfile.of(OauthType.FORTY_TWO, "oauthId", "oauthName");
		return Member.of(oauthProfile,
				Country.KOREA,
				Country.Campus.SEOUL,
				nickname,
				"statement",
				memberRole,
				now);
	}
}