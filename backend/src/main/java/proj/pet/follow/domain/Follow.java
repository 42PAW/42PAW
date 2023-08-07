package proj.pet.follow.domain;

import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.MemberCompositeKey;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "FOLLOW")
@Getter
public class Follow implements Validatable {

	@EmbeddedId
	private MemberCompositeKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Member to;

	@Column(name = "FOLLOWED_AT", nullable = false)
	private LocalDateTime followedAt;

	private Follow(Member from, Member to, LocalDateTime now) {
		this.id = MemberCompositeKey.of(from.getId(), to.getId());
		this.from = from;
		this.to = to;
		this.followedAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Follow of(Member from, Member to, LocalDateTime now) {
		return new Follow(from, to, now);
	}

	@Override
	public boolean isValid() {
		return id.isValid()
				&& from != null
				&& !from.isNew()
				&& to != null
				&& !to.isNew()
				&& followedAt != null;
	}
}
