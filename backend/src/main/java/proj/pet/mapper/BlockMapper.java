package proj.pet.mapper;

import static org.mapstruct.NullValueMappingStrategy.RETURN_DEFAULT;
import static org.mapstruct.factory.Mappers.getMapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import proj.pet.block.domain.Block;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Mapper(componentModel = "spring",
		nullValueMappingStrategy = RETURN_DEFAULT)
@Component
public interface BlockMapper {

	BlockMapper INSTANCE = getMapper(BlockMapper.class);

	MemberPreviewResponseDto toMemberPreviewResponseDto(Block block);
}
