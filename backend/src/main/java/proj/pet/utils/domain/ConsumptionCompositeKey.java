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
public class ConsumptionCompositeKey implements Serializable, Validatable {

	@Column(name = "CONSUMER_ID")
	private Long consumerId;
	@Column(name = "PROVIDER_ID")
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
