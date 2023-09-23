package proj.pet.board.dto;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import proj.pet.category.domain.Species;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BoardViewMapDto {

	List<String> images;
	int reactionCount;
	int commentCount;
	String previewCommentUser;
	String previewComment;
	boolean isScrapped;
	boolean isReacted;
	List<Species> categories;
}
