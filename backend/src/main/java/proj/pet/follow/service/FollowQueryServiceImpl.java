package proj.pet.follow.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.block.repository.BlockRepository;
import proj.pet.follow.domain.Follow;
import proj.pet.follow.domain.FollowType;
import proj.pet.follow.dto.FollowPaginationDto;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.mapper.FollowMapper;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.dto.MemberPreviewResponseDto;

import java.util.List;

import static proj.pet.follow.domain.FollowType.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FollowQueryServiceImpl implements FollowQueryService {

	private final FollowRepository followRepository;
	private final BlockRepository blockRepository;
	private final FollowMapper followMapper;
	private final MemberMapper memberMapper;

	/**
	 * 로그인한 사용자와 받은 id의 멤버의 관계를 조회한다.
	 *
	 * @param loginUserId 로그인한 사용자 id
	 * @param memberId    조회할 멤버 id
	 * @return FollowType 관계
	 */
	@Override
	public FollowType getFollowType(Long loginUserId, Long memberId) {
		if (loginUserId.equals(0L)) {
			return NONE;
		}
		boolean isFollowing = followRepository.existsByFromIdAndToId(loginUserId, memberId);
		if (isFollowing) {
			return FOLLOWING;
		}
		boolean isBlock = blockRepository.existsByFromIdAndToId(loginUserId, memberId);
		if (isBlock) {
			return BLOCK;
		}
		return NONE;
	}

	/**
	 * 받은 id의 멤버가 팔로우 하는 멤버들 조회
	 * <br>
	 * 팔로우 멤버들과 나와의 관계를 포함한다.
	 *
	 * @param memberId 로그인한 사용자 id
	 * @param pageable 페이지 정보
	 * @return FollowPaginationDto 팔로우 정보
	 */
	@Override
	public FollowPaginationDto getFollowings(Long loginUserId, Long memberId,
	                                         PageRequest pageable) {
		Page<Follow> followings =
				followRepository.findAllByToWithMember(memberId, pageable);
		List<MemberPreviewResponseDto> responseDtoList = followings.stream().map(follow ->
				memberMapper.toMemberPreviewResponseDto(
						follow.getTo(), getFollowType(loginUserId, memberId))).toList();
		return followMapper.toFollowResponseDto(responseDtoList, followings.getTotalElements());
	}

	/**
	 * 받은 id의 멤버를 팔로우 하는 멤버들 조회
	 * <br>
	 * 팔로우 멤버들과 나와의 관계를 포함한다.
	 *
	 * @param memberId 로그인한 사용자 id
	 * @param pageable 페이지 정보
	 * @return FollowPaginationDto 팔로우 정보
	 */
	@Override
	public FollowPaginationDto getFollowers(Long loginUserId, Long memberId, PageRequest pageable) {
		Page<Follow> followers =
				followRepository.findAllByFromWithMember(memberId, pageable);
		List<MemberPreviewResponseDto> responseDtoList = followers.stream().map(follow ->
				memberMapper.toMemberPreviewResponseDto(
						follow.getFrom(), getFollowType(loginUserId, memberId))).toList();
		return followMapper.toFollowResponseDto(responseDtoList, followers.getTotalElements());
	}
}
