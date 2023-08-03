package proj.pet.mapper;


import org.mapstruct.Mapper;

import static org.mapstruct.factory.Mappers.getMapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {
	BoardMapper INSTANCE = getMapper(BoardMapper.class);


}
