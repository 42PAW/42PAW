package proj.pet.notice.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import proj.pet.notice.domain.NoticeType;

import java.time.LocalDateTime;

@Getter
@ToString
@AllArgsConstructor
@EqualsAndHashCode
public class NoticeDto {

	private Long id;
	private NoticeType type;
	private NoticeParameterDto parameter;
	private String thumbnailUrl;
	private LocalDateTime readAt;
}
