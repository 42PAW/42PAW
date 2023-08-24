package proj.pet.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.category.domain.Species;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CategoryUpdateRequestDto {

	private List<Species> categories;
}
