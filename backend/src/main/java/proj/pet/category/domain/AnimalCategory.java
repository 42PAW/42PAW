package proj.pet.category.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

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

	@OneToMany(mappedBy = "animalCategory", fetch = LAZY)
	private List<MemberCategoryFilter> memberCategoryFilterList;

	@OneToMany(mappedBy = "animalCategory", fetch = LAZY)
	private List<BoardCategoryFilter> boardCategoryFilterList;

}
