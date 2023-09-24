package proj.pet.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.category.domain.Species;

import java.util.List;

@AllArgsConstructor
@Getter
public class CategoryResponseDto {
	List<Species> speciesList;

}
