package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;
<<<<<<< Updated upstream
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;
=======
import proj.pet.reaction.domain.Reaction;
>>>>>>> Stashed changes

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "BOARD")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Board extends IdDomain implements Validatable {

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;

	@Column(name = "visible_scope", nullable = false)
	@Enumerated(EnumType.STRING)
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

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
	protected Board(Member member, VisibleScope visibleScope, String content, LocalDateTime now) {
		this.member = member;
		this.visibleScope = visibleScope;
		this.content = content;
		this.updatedAt = now;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Board of(Member member, VisibleScope visibleScope, String content, LocalDateTime now) {
		return new Board(member, visibleScope, content, now);
	}

	@Override public boolean isValid() {
		return this.member != null
			&& !this.member.isNew()
			&& this.visibleScope != null
			&& this.content != null
			&& this.updatedAt != null
			&& this.createdAt != null;
	}

	@OneToMany(mappedBy = "board",
			targetEntity = Reaction.class,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Reaction> reactions = new ArrayList<>();
}
