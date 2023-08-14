package proj.pet.mapper;

import static org.mapstruct.factory.Mappers.getMapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import proj.pet.follow.domain.FollowType;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Mapper(componentModel = "spring")
@Component
public interface MemberMapper {

	MemberMapper INSTANCE = getMapper(MemberMapper.class);

	@Mapping(target = "memberName", source = "member.nickname")
	@Mapping(target = "intraName", source = "member.oauthProfile.name")
	MemberPreviewResponseDto toMemberPreviewResponseDto(Member member, FollowType relationship);


	@Mapping(target = "memberId", source = "member.id")
	@Mapping(target = "memberName", source = "member.nickname")
	@Mapping(target = "intraName", source = "member.oauthProfile.name")
	MemberMyInfoResponseDto toMemberMyInfoResponseDto(Member member);
}
