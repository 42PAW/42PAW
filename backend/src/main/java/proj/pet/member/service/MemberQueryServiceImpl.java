package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.repository.MemberRepository;
import proj.pet.utils.annotations.QueryService;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@QueryService
@RequiredArgsConstructor
public class MemberQueryServiceImpl implements MemberQueryService {
	private final MemberRepository memberRepository;
	private final MemberMapper memberMapper;

	@Override public MemberMyInfoResponseDto getMyInfo(Long loginUserId) {
		Member member = memberRepository.findById(loginUserId).orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		return memberMapper.toMemberMyInfoResponseDto(member);
	}
}
