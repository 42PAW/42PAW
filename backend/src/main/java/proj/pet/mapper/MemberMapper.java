package proj.pet.mapper;

import static org.mapstruct.factory.Mappers.getMapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import proj.pet.category.domain.Species;
import proj.pet.follow.domain.FollowType;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberNicknameValidateResponseDto;
import proj.pet.member.dto.MemberPreviewResponseDto;
import proj.pet.member.dto.MemberProfileChangeResponseDto;
import proj.pet.member.dto.MemberProfileResponseDto;
import proj.pet.member.dto.MemberSearchPaginationDto;

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
	MemberMyInfoResponseDto toMemberMyInfoResponseDto(Member member,
			List<Species> animalCategories);

	MemberNicknameValidateResponseDto toMemberNicknameValidateResponseDto(Boolean isValid);

	@Mapping(target = "memberName", source = "member.nickname")
	@Mapping(target = "intraName", source = "member.oauthProfile.name")
	MemberProfileResponseDto toMemberProfileResponseDto(Member member, long followingCount,
			long followerCount, long boardCount, FollowType followType);

	@Mapping(target = "memberName", source = "member.nickname")
	@Mapping(target = "imageUrl", source = "member.profileImageUrl")
	MemberProfileChangeResponseDto toMemberProfileChangeResponseDto(Member member);

	MemberSearchPaginationDto toMemberSearchResponseDto(List<MemberPreviewResponseDto> result,
			long totalLength);
}
