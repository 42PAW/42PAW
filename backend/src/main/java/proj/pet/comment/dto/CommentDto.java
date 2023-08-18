package proj.pet.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import proj.pet.member.domain.Country;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class CommentDto {
	private Long commentId;
	private Long memberId;
	private String memberName;
	private Country country;
	private String comment;
	private String profileImageUrl;
	private LocalDateTime createdAt;
}
