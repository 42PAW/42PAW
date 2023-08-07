package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.category.domain.Species;
import proj.pet.member.dto.UserSession;

import java.util.List;

public interface BoardFacadeService {

	BoardsResponseDto getMainViewBoards(PageRequest pageRequest);

	BoardsResponseDto getHotBoards(PageRequest pageRequest);

	BoardsResponseDto getMemberBoards(PageRequest pageRequest, Long memberId);

	void createBoard(UserSession userSession, List<MultipartFile> mediaDataList, List<Species> categoryList, String content);

	void deleteBoard(UserSession userSession, Long boardId);
}
