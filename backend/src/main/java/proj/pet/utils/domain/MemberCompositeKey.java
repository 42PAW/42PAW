package proj.pet.utils.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class MemberCompositeKey implements Serializable, Validatable {

	@Column(name = "MEMBER_ID")
	private Long memberId;

	@Column(name = "TARGET_MEMBER_ID")
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
