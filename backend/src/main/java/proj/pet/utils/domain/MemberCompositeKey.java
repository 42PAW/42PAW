package proj.pet.utils.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class MemberCompositeKey implements Serializable, Validatable {

	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "target_member_id")
	private Long targetMemberId;

	private MemberCompositeKey(Long memberId, Long targetMemberId) {
		this.memberId = memberId;
		this.targetMemberId = targetMemberId;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static MemberCompositeKey of(Long memberId, Long targetMemberId) {
		return new MemberCompositeKey(memberId, targetMemberId);
	}

	@Override public boolean isValid() {
		return memberId != null
				&& targetMemberId != null;
	}
}
