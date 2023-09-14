package proj.pet.reaction.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.reaction.domain.ReactionType;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReactionRequestDto {
	@NotNull
	private Long boardId;
	@NotNull
	private ReactionType reactionType;
}