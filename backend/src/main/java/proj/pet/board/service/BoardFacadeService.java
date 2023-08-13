package proj.pet.board.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.board.dto.BoardsResponseDto;
import proj.pet.category.domain.Species;
import proj.pet.member.dto.UserSessionDto;

import java.util.List;

public interface BoardFacadeService {

	BoardsResponseDto getMainViewBoards(UserSessionDto userSessionDto, PageRequest pageRequest);

	BoardsResponseDto getHotBoards(UserSessionDto userSessionDto, PageRequest pageRequest);

	BoardsResponseDto getMemberBoards(UserSessionDto userSessionDto, Long memberId, PageRequest pageRequest);

	void createBoard(UserSessionDto userSessionDto, List<MultipartFile> mediaDataList, List<Species> categoryList, String content);

	void deleteBoard(UserSessionDto userSessionDto, Long boardId);
}
