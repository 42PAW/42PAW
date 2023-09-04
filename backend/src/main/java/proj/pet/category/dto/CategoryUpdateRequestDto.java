package proj.pet.category.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.category.domain.Species;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class CategoryUpdateRequestDto {

	private List<Species> categories;
}
