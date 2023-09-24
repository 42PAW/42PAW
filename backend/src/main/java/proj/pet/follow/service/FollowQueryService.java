package proj.pet.follow.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.follow.domain.FollowType;
import proj.pet.follow.dto.FollowPaginationDto;

public interface FollowQueryService {

	FollowType getFollowType(Long loginUserId, Long memberId);

	FollowPaginationDto getFollowings(Long loginUserId, Long memberId, PageRequest pageable);

	FollowPaginationDto getFollowers(Long loginUserId, Long memberId, PageRequest pageable);
}
