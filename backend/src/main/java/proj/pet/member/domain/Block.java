package proj.pet.member.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.utils.domain.MemberCompositeKey;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "BLOCK")
@Getter
public class Block {

	@EmbeddedId
	private MemberCompositeKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member from;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "target_member_id", nullable = false, insertable = false, updatable = false)
	private Member to;

	@Column(name = "blocked_at", nullable = false)
	private LocalDateTime blockedAt;
}
