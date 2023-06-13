package proj.pet.utils.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.Getter;

@Embeddable
@Getter
public class MemberCompositeKey implements Serializable {

	@Column(name = "member_id")
	private Long memberId;

	@Column(name = "target_member_id")
	private Long targetMemberId;
}
