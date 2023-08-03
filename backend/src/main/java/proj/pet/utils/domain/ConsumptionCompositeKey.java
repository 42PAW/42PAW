package proj.pet.utils.domain;

import jakarta.persistence.Embeddable;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class ConsumptionCompositeKey implements Serializable, Validatable {

	private Long consumerId;

	private Long providerId;


	private ConsumptionCompositeKey(Long consumerId, Long providerId) {
		this.consumerId = consumerId;
		this.providerId = providerId;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static ConsumptionCompositeKey of(Long consumerId, Long providerId) {
		return new ConsumptionCompositeKey(consumerId, providerId);
	}

	@Override public boolean isValid() {
		return consumerId != null
				&& providerId != null;
	}
}
