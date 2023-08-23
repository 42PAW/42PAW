package proj.pet.utils.domain;

import jakarta.persistence.*;
import lombok.ToString;

@MappedSuperclass
@ToString
public abstract class IdentityDomain extends IdDomain<Long> {
	@Id @Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id = null;

	@Override
	public Long getId() {
		return id;
	}
}
