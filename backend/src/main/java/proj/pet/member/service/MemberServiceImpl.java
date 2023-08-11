package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.member.domain.Country;
import proj.pet.member.domain.Member;
import proj.pet.member.domain.MemberImageManager;
import proj.pet.member.domain.MemberRole;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	private final MemberImageManager memberImageManager;
	private final AnimalCategoryRepository animalCategoryRepository;

	@Override public void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData) {
		Member member = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		String profileImageUrl = memberImageManager.uploadMemberProfileImage(profileImageData);
		member.changeProfileImageUrl(profileImageUrl);
	}

	@Override public void changeMemberProfileImage(Long memberId, MultipartFile profileImageData) {
		Member member = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::toServiceException);
		memberImageManager.deleteMemberProfileImage(member.getProfileImageUrl());
		String profileImageUrl = memberImageManager.uploadMemberProfileImage(profileImageData);
		member.changeProfileImageUrl(profileImageUrl);
	}

	// TODO: userSession을 이용한 NOT_REGISTERED인 상태의 멤버의 정보들을 이용해야 함.
	@Override public Member createMember(
			JwtPayload payload,
			String nickname,
			String statement,
			List<Species> categoryFilters,
			LocalDateTime now
	) {
		Country country = Country.whereLocates(payload.getCampus());
		System.out.println("country = " + country);
		Member member = Member.of(
				payload.getProfile(),
				country,
				country.getLanguage(),
				nickname,
				statement,
				MemberRole.USER,
				now);
		List<MemberCategoryFilter> filters =
				animalCategoryRepository.findBySpeciesIn(categoryFilters).stream()
						.map(category -> MemberCategoryFilter.of(member, category))
						.toList();
		member.addCategoryFilters(filters);
		return memberRepository.save(member);
	}


}
