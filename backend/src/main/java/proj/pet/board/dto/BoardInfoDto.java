package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import proj.pet.category.domain.Species;
import proj.pet.follow.domain.FollowType;
import proj.pet.member.domain.Country;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class BoardInfoDto {

	private final Long boardId;
	private final Long memberId;
	private final String memberName;
	private final String intraName;
	private final String profileImageUrl;
	private final FollowType followType;
	private final Country country;
	private final List<String> images;
	private final List<Species> categories;
	private final int reactionCount;
	private final int commentCount;
	private final boolean scrapped;
	private final boolean reacted;
	private final String content;
	private final String previewCommentUser;
	private final String previewComment;
	private final LocalDateTime createdAt;
}
