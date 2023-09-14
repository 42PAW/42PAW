package proj.pet.category.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.category.domain.Species;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class CategoryUpdateRequestDto {

	@NotNull
	private List<Species> categories;
}
