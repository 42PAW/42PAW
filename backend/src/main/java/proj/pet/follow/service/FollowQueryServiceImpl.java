package proj.pet.follow.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.pet.follow.domain.Follow;
import proj.pet.follow.dto.FollowPagenationDto;
import proj.pet.follow.repository.FollowRepository;
import proj.pet.mapper.FollowMapper;
import proj.pet.mapper.MemberMapper;
import proj.pet.member.dto.MemberPreviewResponseDto;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FollowQueryServiceImpl implements FollowQueryService {

	private final FollowRepository followRepository;
	private final FollowMapper followMapper;
	private final MemberMapper memberMapper;

	@Override
	public FollowPagenationDto getFollowings(Long memberId, Pageable pageable) {
		Page<Follow> followings =
				followRepository.findAllByToWithMember(memberId, pageable);
		List<MemberPreviewResponseDto> responseDtoList = followings.stream().map(follow ->
				memberMapper.toMemberPreviewResponseDto(follow.getTo())).toList();
		return followMapper.toFollowResponseDto(responseDtoList, followings.getTotalElements());
	}

	@Override
	public FollowPagenationDto getFollowers(Long memberId, Pageable pageable) {
		Page<Follow> followers =
				followRepository.findAllByFromWithMember(memberId, pageable);
		List<MemberPreviewResponseDto> responseDtoList = followers.stream().map(follow ->
				memberMapper.toMemberPreviewResponseDto(follow.getFrom())).toList();
		return followMapper.toFollowResponseDto(responseDtoList, followers.getTotalElements());
	}
}
