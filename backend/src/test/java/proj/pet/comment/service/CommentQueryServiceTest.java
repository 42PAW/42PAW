package proj.pet.comment.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.VisibleScope;
import proj.pet.board.repository.BoardRepository;
import proj.pet.comment.domain.Comment;
import proj.pet.comment.dto.CommentDto;
import proj.pet.comment.dto.CommentResponseDto;
import proj.pet.comment.repository.CommentRepository;
import proj.pet.member.domain.*;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class CommentQueryServiceTest {

	@Autowired
	private CommentQueryService commentQueryService;

	@Autowired
	private EntityManager em;

	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private CommentRepository commentRepository;

	@DisplayName("게시물에 작성된 댓글들을 조회할 수 있다.")
	@Test
	@Disabled
	void findCommentsByBoardId() {
		//given
		LocalDateTime now = LocalDateTime.now();
		Member author = memberRepository.save(stubMember("sanan", MemberRole.USER, now));
		Member loginUser = memberRepository.save(stubMember("hyungnoh", MemberRole.USER, now));
		Board board = boardRepository.save(Board.of(author, VisibleScope.PUBLIC, "content", now));
		commentRepository.saveAll(List.of(
				Comment.of(board, loginUser, "일빠요", now),
				Comment.of(board, loginUser, "2등이요", now.plusHours(1)),
				Comment.of(board, loginUser, "3등이요", now.plusHours(2))
		));
		em.flush();
		em.clear();

		//when
		CommentResponseDto commentResponseDto = commentQueryService.findCommentsByBoardId(loginUser.getId(), board.getId(), PageRequest.of(0, 10));

		//then
		List<CommentDto> result = commentResponseDto.getResult();
		assertThat(result.get(0).getCountry()).isEqualTo(Country.KOREA);
		assertThat(result).hasSize(3)
				.extracting("comment")
				.containsExactly("일빠요", "2등이요", "3등이요");
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