package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.domain.*;
import proj.pet.member.dto.MemberCreateRequestDto;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	private final MemberMapper memberMapper;

	@Override public void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData) {

	}

	@Override public void changeMemberProfileImage(Long memberId, MultipartFile profileImageData) {

	}

	// TODO: userSession을 이용한 NOT_REGISTERED인 상태의 멤버의 정보들을 이용해야 함.
	@Override public Member createMember(
			MemberCreateRequestDto memberCreateRequestDto) {
		Member member = Member.of(
				OauthProfile.of(OauthType.FORTY_TWO, "42", "sanan"),
				"imageUrl",
				Country.KOREA,
				Country.KOREA.getLanguage(),
				memberCreateRequestDto.getMemberName(),
				memberCreateRequestDto.getStatement(),
				MemberRole.USER,
				LocalDateTime.now() // TODO: Parameterize
		);
		return memberRepository.save(member);
	}

	@Override public MemberMyInfoResponseDto getMyInfo(Long loginUserId) {
		Member member = memberRepository.findById(loginUserId).orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		return memberMapper.toMemberMyInfoResponseDto(member);
	}
}
