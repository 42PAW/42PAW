package proj.pet.board.service;

import proj.pet.board.domain.Board;
import proj.pet.category.domain.Species;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Board의 CUD 비즈니스 로직을 담당하는 서비스 인터페이스
 */
public interface BoardService {

	/**
	 * 게시글을 생성한다.
	 *
	 * @param memberId      게시글을 생성하는 사용자의 ID
	 * @param categoryList  게시글의 사진에 해당하는 동물 종 리스트
	 * @param mediaDataList 게시글에 첨부될 사진, 동영상 데이터 리스트
	 * @param content       게시글의 내용
	 * @param now           생성시각
	 * @return 영속화된 게시글 엔티티
	 */

	Board createBoard(Long memberId, List<Species> categoryList, List<String> mediaUrlList, String content, LocalDateTime now);

	/**
	 * 게시글을 삭제한다.
	 *
	 * @param memberId 게시글을 삭제하는 사용자의 ID
	 * @param boardId  삭제할 게시글의 ID
	 */
	void deleteBoard(Long memberId, Long boardId);
}
