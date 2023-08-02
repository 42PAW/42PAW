package proj.pet.follow.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.MemberCompositeKey;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "FOLLOW")
@Getter
public class Follow {

	@EmbeddedId
	private MemberCompositeKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false, insertable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "target_member_id", nullable = false, insertable = false, updatable = false)
	private Member to;

	@Column(name = "followed_at", nullable = false)
	private LocalDateTime followedAt;
}
