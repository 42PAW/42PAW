package proj.pet.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class CommentDto {
	private Long commentId;
	private String memberId;
	private String memberName;
	private String comment;
	private String profileImageUrl;
	private LocalDateTime createdAt;
}
