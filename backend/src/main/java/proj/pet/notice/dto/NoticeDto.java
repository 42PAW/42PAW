package proj.pet.notice.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import proj.pet.notice.domain.NoticeType;

@Getter
@ToString
@AllArgsConstructor
@EqualsAndHashCode
public class NoticeDto {

	private Long id;
	private NoticeType type;
	private List<NoticeParameterDto> parameters;
	private String thumbnailUrl;
	private LocalDateTime readAt;
}
