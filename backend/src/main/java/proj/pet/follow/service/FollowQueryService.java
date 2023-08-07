package proj.pet.follow.service;

import org.springframework.data.domain.Pageable;
import proj.pet.follow.dto.FollowPagenationDto;

public interface FollowQueryService {

	FollowPagenationDto getFollowings(Long memberId, Pageable pageable);

	FollowPagenationDto getFollowers(Long memberId, Pageable pageable);
}
