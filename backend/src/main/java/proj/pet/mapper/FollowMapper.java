package proj.pet.mapper;

import static org.mapstruct.NullValueMappingStrategy.RETURN_DEFAULT;
import static org.mapstruct.factory.Mappers.getMapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import proj.pet.follow.dto.FollowPagenationDto;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Mapper(componentModel = "spring",
		nullValueMappingStrategy = RETURN_DEFAULT)
@Component
public interface FollowMapper {

	FollowMapper INSTANCE = getMapper(FollowMapper.class);

	FollowPagenationDto toFollowResponseDto(List<MemberPreviewResponseDto> result,
			long totalLength);
}
