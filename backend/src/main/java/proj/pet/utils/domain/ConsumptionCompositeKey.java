package proj.pet.utils.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.Getter;

@Getter
@Embeddable
public class ConsumptionCompositeKey implements Serializable {

	@Column(name = "consumer_id")
	private Long consumerId;

	@Column(name = "provider_id")
	private Long providerId;
}
