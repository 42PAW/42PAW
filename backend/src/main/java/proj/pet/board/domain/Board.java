package proj.pet.board.domain;

import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;

@Entity
@Table(name = "BOARD")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Board {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
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
}
