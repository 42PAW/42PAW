package proj.pet.notice.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import proj.pet.notice.domain.NoticeEntityType;

@Getter
@ToString
@AllArgsConstructor
@EqualsAndHashCode
public class NoticeParameterDto {
	private NoticeEntityType type;
	private Long id;
	private String content;
}
