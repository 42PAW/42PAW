package proj.pet.board.domain;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.comment.domain.Comment;
import proj.pet.member.domain.Member;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@Entity
@Table(name = "BOARD")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Board extends IdDomain implements Validatable {

	@OneToMany(mappedBy = "board",
			targetEntity = BoardMedia.class,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private final List<BoardMedia> mediaList = new ArrayList<>();
	@OneToMany(mappedBy = "board",
			targetEntity = BoardCategoryFilter.class,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private final List<BoardCategoryFilter> categoryFilters = new ArrayList<>();
	@OneToMany(mappedBy = "board",
			targetEntity = Reaction.class,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private final List<Reaction> reactions = new ArrayList<>();
	@OneToMany(mappedBy = "board",
			targetEntity = Comment.class,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private final List<Comment> comments = new ArrayList<>();
	@OneToMany(mappedBy = "board",
			targetEntity = Scrap.class,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private final List<Scrap> scraps = new ArrayList<>();

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, updatable = false)
	private Member member;
	@Column(name = "VISIBLE_SCOPE", nullable = false, length = 32)
	@Enumerated(EnumType.STRING)
	private VisibleScope visibleScope;
	/**
	 * null이 아닌 빈 문자열을 들고 있도록 설정
	 */
	@Column(name = "CONTENT", nullable = false)
	private String content;
	@Column(name = "UPDATED_AT", nullable = false)
	private LocalDateTime updatedAt;
	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;
	@Column(name = "DELETED_AT")
	private LocalDateTime deletedAt;

	protected Board(Member member, VisibleScope visibleScope, String content, LocalDateTime now) {
		this.member = member;
		this.visibleScope = visibleScope;
		this.content = content;
		this.updatedAt = now;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Board of(Member member, VisibleScope visibleScope, String content,
			LocalDateTime now) {
		return new Board(member, visibleScope, content, now);
	}

	@Override
	public boolean isValid() {
		return this.member != null
				&& !this.member.isNew()
				&& this.visibleScope != null
				&& this.content != null
				&& this.updatedAt != null
				&& this.createdAt != null
				&& this.mediaList.size() == 0
				&& this.categoryFilters.size() == 0;
	}

	public void addCategoryFilters(List<BoardCategoryFilter> categoryFilters) {
		this.categoryFilters.addAll(categoryFilters);
		RuntimeExceptionThrower.checkValidity(this);
	}

	public void addMediaList(List<BoardMedia> mediaList) {
		this.mediaList.addAll(mediaList);
		RuntimeExceptionThrower.checkValidity(this);
	}

	public boolean isOwnedBy(Member member) {
		return this.member.equals(member);
	}

	public List<Species> getCategoriesAsSpecies() {
		return this.categoryFilters.stream()
				.map(BoardCategoryFilter::getSpecies)
				.toList();
	}

	public List<String> findBoardMediaUrls() {
		return this.mediaList.stream()
				.map(BoardMedia::getMediaUrl)
				.toList();
	}
}
