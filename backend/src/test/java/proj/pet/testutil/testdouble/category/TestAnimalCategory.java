package proj.pet.testutil.testdouble.category;

import lombok.Builder;
import proj.pet.category.domain.AnimalCategory;
import proj.pet.category.domain.Species;
import proj.pet.testutil.testdouble.TestEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
public class TestAnimalCategory implements TestEntity<AnimalCategory, Long> {

	public static final Species DEFAULT_SPECIES = Species.DOG;

	@Builder.Default
	private final Species species = DEFAULT_SPECIES;

	public static List<AnimalCategory> getAllSpeciesAsCategories() {
		return Arrays.stream(Species.values()).map(AnimalCategory::of).toList();
	}

	@Override public AnimalCategory asEntity() {
		return AnimalCategory.of(
				this.species
		);
	}

	@Override public AnimalCategory asMockEntity(Long id) {
		AnimalCategory animalCategory = mock(AnimalCategory.class);
		lenient().when(animalCategory.getId()).thenReturn(id);
		lenient().when(animalCategory.getSpecies()).thenReturn(this.species);
		return animalCategory;
	}
}
