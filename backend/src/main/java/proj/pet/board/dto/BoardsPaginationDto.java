package proj.pet.board.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardsPaginationDto {

	private final List<BoardInfoDto> result;
	private final int totalLength;
}
