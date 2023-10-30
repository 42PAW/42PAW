package proj.pet.member.service;

import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;
import static proj.pet.follow.domain.FollowType.NONE;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.board.repository.BoardRepository;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.follow.domain.FollowType;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.follow.service.FollowQueryService;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.domain.Language;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberMyInfoResponseDto;
import proj.pet.member.dto.MemberNicknameValidateResponseDto;
import proj.pet.member.dto.MemberPreviewResponseDto;
import proj.pet.member.dto.MemberProfileResponseDto;
import proj.pet.member.dto.MemberSearchPaginationDto;
import proj.pet.member.repository.MemberRepository;
import proj.pet.utils.annotations.QueryService;

@QueryService
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberQueryServiceImpl implements MemberQueryService {

	private static final String regex = "^[a-zA-Z\\u00C0-\\u00FF\\u0100-\\u017F\\u0180-\\u024F\\u0370-\\u03FF\\u0400-\\u04FF\\u3040-\\u30FF\\u3130-\\u318F\\uAC00-\\uD7AF\\.\\_\\-][a-zA-Z0-9\\u00C0-\\u00FF\\u0100-\\u017F\\u0180-\\u024F\\u0370-\\u03FF\\u0400-\\u04FF\\u3040-\\u30FF\\u3130-\\u318F\\uAC00-\\uD7AF\\.\\_\\-]*$";
	private final MemberRepository memberRepository;
	private final FollowRepository followRepository;
	private final BoardRepository boardRepository;
	private final FollowQueryService followQueryService;
	private final MemberMapper memberMapper;

	/**
	 * 닉네임을 받아 해당 닉네임을 사용하고 있는 유저가 있는지 검사
	 *
	 * @param nickname 닉네임
	 * @return MemberNicknameValidateResponseDto    중복 검사 결과
	 */
	@Override
	public MemberNicknameValidateResponseDto validateMemberNickname(String nickname) {
		return new MemberNicknameValidateResponseDto(nickname.matches(regex)
				&& memberRepository.findByNickname(nickname).isEmpty());
	}

	/**
	 * 내 정보를 간단하게 조회하여 반환
	 *
	 * @param loginUserId 로그인 유저 id
	 * @return MemberMyInfoResponseDto  내 정보
	 * @throws proj.pet.exception.ServiceException 존재하지 않는 멤버
	 */
	@Override
	public MemberMyInfoResponseDto getMyInfo(Long loginUserId) {
		if (loginUserId.equals(0L)) {
			return new MemberMyInfoResponseDto(null, null, null, null,
					Language.ENGLISH, new ArrayList<>());
		}
		Member member = memberRepository.findById(loginUserId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		List<Species> animalCategories = member.getMemberCategoryFilters().stream()
				.map((MemberCategoryFilter::getSpecies)).toList();
		return memberMapper.toMemberMyInfoResponseDto(member, animalCategories);
	}

	/**
	 * memberId 기준으로 프로필을 조회하고, 팔로잉, 팔로워, 게시글 수를 조회하여 반환
	 * <br>
	 * getMyProfile과 getMemberProfile에서 사용
	 *
	 * @param memberId   내 id
	 * @param followType 팔로우 타입
	 * @return MemberProfileResponseDto 내 프로필
	 * @throws proj.pet.exception.ServiceException 존재하지 않는 멤버
	 */
	private MemberProfileResponseDto getProfile(Long memberId, FollowType followType) {
		Member member = memberRepository.findById(memberId)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		long followingCount = followRepository.countByFollowingId(memberId);
		long followerCount = followRepository.countByFollowerId(memberId);
		long boardCount = boardRepository.countByMemberId(memberId);
		return memberMapper.toMemberProfileResponseDto(
				member, followingCount, followerCount, boardCount, followType);
	}

	/**
	 * 내 프로필을 조회하여 반환
	 *
	 * @param loginUserId 로그인 유저 id
	 * @return MemberProfileResponseDto 내 프로필
	 * @throws proj.pet.exception.ServiceException 존재하지 않는 멤버
	 */
	@Override
	public MemberProfileResponseDto getMyProfile(Long loginUserId) {
		return getProfile(loginUserId, NONE);
	}

	/**
	 * 다른 멤버의 프로필을 조회하여 반환
	 * <br>
	 * 나와 해당 멤버의 팔로우 관계를 조회하여 같이 반환
	 *
	 * @param loginUserId 로그인 유저 id
	 * @param memberId    멤버 id
	 * @return MemberProfileResponseDto 멤버 프로필
	 * @throws proj.pet.exception.ServiceException 존재하지 않는 멤버
	 */
	@Override
	public MemberProfileResponseDto getMemberProfile(Long loginUserId, Long memberId) {
		return getProfile(memberId, followQueryService.getFollowType(loginUserId, memberId));
	}

	/**
	 * 해당 이름을 포함하는 닉네임을 가진 멤버를 검색하여 반환
	 * <br>
	 * 나와 해당 멤버의 팔로우 관계를 조회하여 같이 반환
	 *
	 * @param memberId    멤버 id
	 * @param partialName 닉네임
	 * @param pageable    페이지 정보
	 * @return MemberSearchResponseDto  멤버 검색 결과
	 */
	@Override
	public MemberSearchPaginationDto searchMemberByName(Long memberId, String partialName,
			PageRequest pageable) {
		Page<Member> members = memberRepository.findByNicknameContaining(partialName, pageable);
		List<MemberPreviewResponseDto> result = members.stream().map(member ->
				memberMapper.toMemberPreviewResponseDto(member, followQueryService
						.getFollowType(memberId, member.getId()))).toList();
		return memberMapper.toMemberSearchResponseDto(result, members.getTotalElements());
	}

	/**
	 * 태깅을 누르면 해당 이름을 가진 멤버를 검색하여 반환
	 *
	 * @param loginUserId 로그인 유저 id
	 * @param name        닉네임
	 * @return MemberProfileResponseDto 멤버 프로필
	 */
	@Override
	public MemberProfileResponseDto getTaggingMember(Long loginUserId, String name) {
		Member taggingMember = memberRepository.findByNickname(name)
				.orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		FollowType followType = followQueryService.getFollowType(loginUserId,
				taggingMember.getId());
		long followerCount = followRepository.countByFollowerId(taggingMember.getId());
		long followingCount = followRepository.countByFollowingId(taggingMember.getId());
		long boardCount = boardRepository.countByMemberId(taggingMember.getId());
		return memberMapper.toMemberProfileResponseDto(taggingMember, followingCount,
				followerCount, boardCount, followType);
	}
}
