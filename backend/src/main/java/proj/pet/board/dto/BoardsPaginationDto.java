package proj.pet.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class BoardsPaginationDto {

	private final List<BoardInfoDto> result;
	private final int totalLength;
}
