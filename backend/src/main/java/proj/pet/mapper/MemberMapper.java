package proj.pet.mapper;

import static org.mapstruct.factory.Mappers.getMapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Mapper(componentModel = "spring")
@Component
public interface MemberMapper {

	MemberMapper INSTANCE = getMapper(MemberMapper.class);

	MemberPreviewResponseDto toMemberPreviewResponseDto(Member member);
}
