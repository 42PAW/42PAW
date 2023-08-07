package proj.pet.mapper;


import static org.mapstruct.factory.Mappers.getMapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface BoardMapper {

	BoardMapper INSTANCE = getMapper(BoardMapper.class);

}
