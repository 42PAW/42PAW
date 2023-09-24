package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardReactionCountDto {

	Long boardId;
	Long reactionCount;
}
