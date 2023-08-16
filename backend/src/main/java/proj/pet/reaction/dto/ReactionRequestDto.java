package proj.pet.reaction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.reaction.domain.ReactionType;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ReactionRequestDto {
	private Long boardId;
	private ReactionType reactionType;
}