package proj.pet.board.dto;

import java.util.List;
import lombok.Getter;
import lombok.ToString;
import proj.pet.board.domain.BoardMedia;
import proj.pet.category.domain.BoardCategoryFilter;
import proj.pet.comment.domain.Comment;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;

@Getter
@ToString
public class BoardViewSubDto {

	private final List<BoardMedia> mediaList;
	private final List<BoardReactionCountDto> reactionCounts;
	private final List<Reaction> myReaction;
	private final List<Comment> comments;
	private final List<Scrap> myScrap;
	private final List<BoardCategoryFilter> categories;

	public BoardViewSubDto(List<BoardMedia> mediaList, List<BoardReactionCountDto> reactionCounts,
			List<Reaction> myReaction, List<Comment> comments, List<Scrap> myScrap,
			List<BoardCategoryFilter> categories) {
		this.mediaList = mediaList;
		this.reactionCounts = reactionCounts;
		this.myReaction = myReaction;
		this.comments = comments;
		this.myScrap = myScrap;
		this.categories = categories;
	}
}
