package proj.pet.member.service;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

import lombok.RequiredArgsConstructor;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.domain.Language;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.repository.MemberRepository;
import proj.pet.utils.annotations.QueryService;

@QueryService
@RequiredArgsConstructor
public class MemberQueryServiceImpl implements MemberQueryService {

	private final MemberRepository memberRepository;
	private final MemberMapper memberMapper;

	@Override
	public MemberMyInfoResponseDto getMyInfo(Long loginUserId) {
		if (loginUserId.equals(0L)) {
			return new MemberMyInfoResponseDto(null, null, null, null, Language.ENGLISH);
		}
		Member member = memberRepository.findById(loginUserId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		return memberMapper.toMemberMyInfoResponseDto(member);
	}
}
