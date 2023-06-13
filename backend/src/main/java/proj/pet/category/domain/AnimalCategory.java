package proj.pet.category.domain;

import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "animal_category")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class AnimalCategory {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@Column(name = "species", nullable = false, length = 30)
	private String species;

}
