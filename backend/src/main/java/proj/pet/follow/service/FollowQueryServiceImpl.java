package proj.pet.follow.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

	private FollowPagenationDto followsToResponseDto(Page<Follow> follows) {
		List<MemberPreviewResponseDto> responseDtoList = follows.stream().map((follow -> {
			return memberMapper.toMemberPreviewResponseDto(follow.getTo());
		})).toList();
		return followMapper.toFollowResponseDto(responseDtoList, follows.getTotalElements());
	}

	@Override
	public FollowPagenationDto getFollowings(Long memberId, int page, int size) {
		Page<Follow> followings =
				followRepository.findAllByToWithMember(memberId, PageRequest.of(page, size));
		return followsToResponseDto(followings);
	}

	@Override
	public FollowPagenationDto getFollowers(Long memberId, int page, int size) {
		Page<Follow> followers =
				followRepository.findAllByFromWithMember(memberId, PageRequest.of(page, size));
		return followsToResponseDto(followers);
	}
}
