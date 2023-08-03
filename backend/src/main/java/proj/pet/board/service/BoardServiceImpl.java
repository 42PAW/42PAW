package proj.pet.board.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.dto.BoardMediaDto;
import proj.pet.category.domain.AnimalCategory;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
	@Override public void createBoard(Long memberId, List<AnimalCategory> categoryList, List<BoardMediaDto> mediaDataList, String content) {

	}
}
