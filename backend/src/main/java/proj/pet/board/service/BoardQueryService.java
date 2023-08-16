package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardsPaginationDto;

public interface BoardQueryService {

	BoardsPaginationDto getMainViewBoards(Long loginUserId, PageRequest pageRequest);

	BoardsPaginationDto getHotBoards(Long loginUserId, PageRequest pageRequest);

	BoardsPaginationDto getMemberBoards(Long loginUserId, Long memberId, PageRequest pageRequest);

	BoardsPaginationDto getScraps(Long loginUserId, PageRequest pageRequest);

	BoardsPaginationDto getFollowingsBoards(Long memberId, PageRequest pageRequest);
}
