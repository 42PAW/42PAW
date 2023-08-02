package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;

import java.time.LocalDateTime;

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
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
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

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
}
