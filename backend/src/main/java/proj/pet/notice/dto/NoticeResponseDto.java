package proj.pet.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class NoticeResponseDto {

	private final List<NoticeDto> result;
	private final long totalLength;
}
