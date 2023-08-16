package proj.pet.block.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.MemberCompositeKey;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "BLOCK",
		uniqueConstraints = {
				@UniqueConstraint(name = "UNIQUE_BLOCK", columnNames = {"MEMBER_ID", "TARGET_MEMBER_ID"})
		})
@Getter
public class Block implements Validatable {

	@EmbeddedId
	private MemberCompositeKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Member from;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TARGET_MEMBER_ID", nullable = false, insertable = false, updatable = false)
	private Member to;

	@Column(name = "BLOCKED_AT", nullable = false)
	private LocalDateTime blockedAt;

	private Block(Member from, Member to, LocalDateTime now) {
		this.id = MemberCompositeKey.of(from.getId(), to.getId());
		this.from = from;
		this.to = to;
		this.blockedAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Block of(Member from, Member to, LocalDateTime now) {
		return new Block(from, to, now);
	}

	@Override public boolean isValid() {
		return id.isValid()
				&& from != null
				&& !from.isNew()
				&& to != null
				&& !to.isNew()
				&& blockedAt != null;
	}
}
