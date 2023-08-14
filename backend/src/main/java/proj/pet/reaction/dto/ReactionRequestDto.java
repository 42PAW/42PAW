package proj.pet.reaction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.reaction.domain.ReactionType;

@AllArgsConstructor
@Getter
public class ReactionRequestDto {
	private Long boardId;
	private ReactionType reactionType;
}