package proj.pet.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class CommentResponseDto {

	private final List<CommentDto> result;
	private final int totalLength;
}
