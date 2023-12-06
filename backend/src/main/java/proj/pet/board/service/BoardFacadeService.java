package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import proj.pet.board.dto.BoardInfoDto;
import proj.pet.board.dto.BoardsPaginationDto;
import proj.pet.category.domain.Species;
import proj.pet.member.dto.UserSessionDto;

import java.util.List;

public interface BoardFacadeService {

	BoardsPaginationDto getMainViewBoards(UserSessionDto userSessionDto, PageRequest pageRequest);

	BoardsPaginationDto getHotBoards(UserSessionDto userSessionDto, PageRequest pageRequest);

	BoardsPaginationDto getMemberBoards(UserSessionDto userSessionDto, Long memberId,
	                                    PageRequest pageRequest);

	BoardsPaginationDto getFollowingsBoards(UserSessionDto userSessionDto, PageRequest pageRequest);

	void createBoard(UserSessionDto userSessionDto, List<String> mediaUrlList,
	                 List<Species> categoryList, String content);

	void deleteBoard(UserSessionDto userSessionDto, Long boardId);

	BoardInfoDto getBoard(UserSessionDto userSessionDto, Long boardId);

}
