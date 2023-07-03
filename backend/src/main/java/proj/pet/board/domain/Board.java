package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.member.domain.Member;
import proj.pet.report.domain.Report;
import proj.pet.social.domain.Comment;
import proj.pet.social.domain.Reaction;
import proj.pet.social.domain.Scrap;

import java.time.LocalDateTime;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "BOARD")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Board {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "member_id", nullable = false, updatable = false, insertable = false)
	private Member member;

	@Column(name = "visible_scope", nullable = false)
	private VisibleScope visibleScope;

	/**
	 * null이 아닌 빈 문자열을 들고 있도록 설정
	 */
	@Column(name = "content", nullable = false)
	private String content;

	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@OneToMany(mappedBy = "board", fetch = LAZY)
	private List<BoardImage> images;

	@OneToMany(mappedBy = "board", fetch = LAZY)
	private List<BoardCategoryFilter> categoryFilters;

	@OneToMany(mappedBy = "board", fetch = LAZY)
	private List<Scrap> scrapedList;

	@OneToMany(mappedBy = "board", fetch = LAZY)
	private List<Comment> comments;

	@OneToMany(mappedBy = "board", fetch = LAZY)
	private List<Reaction> reactions;

	@OneToMany(mappedBy = "board", fetch = LAZY)
	private List<Report> reportedList;
}
