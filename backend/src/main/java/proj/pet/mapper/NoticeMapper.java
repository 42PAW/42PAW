package proj.pet.mapper;

import static org.mapstruct.NullValueMappingStrategy.RETURN_DEFAULT;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import proj.pet.notice.domain.Notice;
import proj.pet.notice.domain.NoticeEntityType;
import proj.pet.notice.dto.NoticeDto;
import proj.pet.notice.dto.NoticeParameterDto;

@Mapper(componentModel = "spring",
		nullValueMappingStrategy = RETURN_DEFAULT)
@Component
public interface NoticeMapper {

	NoticeParameterDto toNoticeParameterDto(NoticeEntityType type, Long id, String content);

	@Mapping(target = "parameters", source = "parameters")
	@Mapping(target = "type", source = "notice.noticeType")
	NoticeDto toNoticeDto(Notice notice, List<NoticeParameterDto> parameters, String thumbnailUrl);
}
