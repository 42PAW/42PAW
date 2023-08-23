package proj.pet.testutil.testdouble.category;

import lombok.Builder;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.Species;
import proj.pet.testutil.testdouble.TestEntity;

import java.util.Arrays;
import java.util.List;

@Builder
public class TestAnimalCategory implements TestEntity<AnimalCategory> {

	public static final Species DEFAULT_SPECIES = Species.DOG;

	@Builder.Default
	private final Species species = DEFAULT_SPECIES;

	List<AnimalCategory> getAllSpeciesAsCategories() {
		return Arrays.stream(Species.values()).map(AnimalCategory::of).toList();
	}

	@Override public AnimalCategory asEntity() {
		return AnimalCategory.of(
				this.species
		);
	}
}
