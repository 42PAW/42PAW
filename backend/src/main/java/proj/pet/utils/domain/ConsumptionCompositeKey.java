package proj.pet.utils.domain;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class ConsumptionCompositeKey implements Serializable {

	private Long consumerId;

	private Long providerId;
}
