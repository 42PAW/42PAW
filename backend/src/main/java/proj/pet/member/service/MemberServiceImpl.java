package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.repository.AnimalCategoryRepository;
import proj.pet.exception.ServiceException;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.domain.*;
import proj.pet.member.dto.MemberProfileChangeResponseDto;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static proj.pet.exception.ExceptionStatus.NOT_ENOUGH_NICKNAME_CHANGE_PERIOD;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final MemberImageManager memberImageManager;
	private final AnimalCategoryRepository animalCategoryRepository;
	private final MemberMapper memberMapper;

	/**
	 * JWT 토큰의 payload 와 받아온 nickname, statement, categoryFilters 를 이용해 새로운 멤버 생성 및 저장
	 *
	 * @param payload         jwt 토큰의 payload
	 * @param nickname        멤버의 닉네임
	 * @param statement       멤버의 한줄 소개
	 * @param categoryFilters 선택한 카테고리 필터들
	 * @param now             현재 시간
	 * @return Member           생성된 멤버
	 */
	// TODO: userSession을 이용한 NOT_REGISTERED인 상태의 멤버의 정보들을 이용해야 함.
	@Override
	public Member createMember(
			JwtPayload payload,
			String nickname,
			String statement,
			List<Species> categoryFilters,
			LocalDateTime now
	) {
		Country country = Country.whereLocates(payload.getCampus());
		Member member = memberRepository.save(
				Member.of(
						payload.getProfile(),
						country,
						payload.getCampus(),
						nickname,
						statement,
						MemberRole.USER,
						now));
		List<MemberCategoryFilter> filters =
				animalCategoryRepository.findBySpeciesIn(categoryFilters).stream()
						.map(category -> MemberCategoryFilter.of(member, category))
						.toList();
		member.addCategoryFilters(filters);
		return memberRepository.save(member);
	}

	/**
	 * 멤버 id와 저장할 프로필 이미지를 받아와 해당 멤버의 프로필 이미지를 변경
	 *
	 * @param memberId         멤버의 id
	 * @param profileImageData 멤버의 프로필 이미지
	 * @throws proj.pet.exception.ServiceException 받은 id로 찾은 멤버가 없을 때
	 */
	@Override
	public void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData) {
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		if (profileImageData == null || profileImageData.isEmpty()) {
			member.changeProfileImageUrl(null);
		} else {
			String profileImageUrl = memberImageManager.uploadMemberProfileImage(profileImageData);
			member.changeProfileImageUrl(profileImageUrl);
		}
	}

	/**
	 * 로그인한 유저의 세션과 닉네임, 프로필 이미지, 한줄 소개를 받아와 해당 멤버의 프로필 정보를 변경
	 *
	 * @param userSessionDto                현재 로그인한 멤버의 세션 정보
	 * @param memberProfileChangeRequestDto 변경할 멤버의 프로필 정보 (닉네임, 프로필 이미지, 한줄 소개)
	 * @return MemberProfileChangeResponseDto   변경된 멤버의 프로필 정보
	 * @throws proj.pet.exception.ServiceException 존재하지 않는 멤버
	 * @throws proj.pet.exception.DomainException  변경할 닉네임, 프로필 이미지, 한줄 소개가 null을 포함해 잘못된 값 일 때
	 */
	@Override
	public MemberProfileChangeResponseDto changeMemberProfile(
			UserSessionDto userSessionDto,
			String memberName,
			MultipartFile profileImage,
			String statement,
			boolean profileImageChanged) {
		Member member = memberRepository.findById(userSessionDto.getMemberId())
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		if (memberName != null) {
			LocalDateTime changeableDate = member.getNicknameUpdatedAt().plusDays(30);
			if (changeableDate.isAfter(LocalDateTime.now())) {
				throw new ServiceException(NOT_ENOUGH_NICKNAME_CHANGE_PERIOD,
						"닉네임 변경은 " + changeableDate.format(
								DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + " 이후에 가능합니다.");
			}
			member.changeNickname(memberName, LocalDateTime.now());
		}
		if (profileImage != null) {
			memberImageManager.deleteMemberProfileImage(member.getProfileImageUrl());
			String profileImageUrl = memberImageManager.uploadMemberProfileImage(profileImage);
			member.changeProfileImageUrl(profileImageUrl);
		} else if (profileImageChanged) {
			memberImageManager.deleteMemberProfileImage(member.getProfileImageUrl());
			member.changeProfileImageUrl(null);
		}
		if (statement != null) {
			member.changeStatement(statement);
		}
		Member changedMember = memberRepository.findById(userSessionDto.getMemberId())
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		return memberMapper.toMemberProfileChangeResponseDto(changedMember);
	}

	/**
	 * 멤버의 id와 변경할 언어를 받아와 해당 멤버의 언어를 변경
	 * <br>
	 * 변경할 언어가 null 이면 exception 발생
	 * <br>
	 *
	 * @param memberId 멤버의 id
	 * @param language 변경할 언어
	 * @throws proj.pet.exception.ServiceException 존재하지 않는 멤버
	 * @throws proj.pet.exception.DomainException  변경할 언어가 null을 포함해 잘못된 값 일 때
	 */
	@Override
	public void changeLanguage(Long memberId, Language language) {
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		member.changeLanguage(language);
	}
}
