package proj.pet.notice.domain;

import org.springframework.stereotype.Component;
import proj.pet.board.domain.Board;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdDomain;

import java.util.List;

import static proj.pet.notice.domain.NoticeEntityType.BOARD;
import static proj.pet.notice.domain.NoticeEntityType.MEMBER;

@Component
public class EntityAdaptor {

	public <T extends IdDomain<?>> NoticeParameter toNoticeParameter(T entity) {
		if (entity instanceof Member member) {
			return NoticeParameter.of(formatToParameter(member));
		}
		if (entity instanceof Board board) {
			return NoticeParameter.of(formatToParameter(board));
		}
		throw new IllegalArgumentException("Not supported entity type");
	}

	/**
	 * 멤버로 딥링크를 연결하는 문자열을 반환합니다.
	 * <p>
	 * ex) {MBR/1/sanan}
	 *
	 * @param member
	 * @return M/sanan/1
	 */
	private String formatToParameter(Member member) {
		return String.format(MEMBER.getPlaceholder(), member.getNickname(), member.getId());
	}

	/**
	 * 게시글로 딥링크를 연결하는 문자열을 반환합니다.
	 * <p>
	 * 작성자의 닉네임을 포함합니다.
	 * <p>
	 * ex) B/1
	 *
	 * @param board
	 * @return {BRD/$boardId/$authorNickname}
	 */
	private String formatToParameter(Board board) {
		return String.format(BOARD.getPlaceholder(), board.getId());
	}

	/**
	 * 엔티티 리스트를 NoticeParameter 리스트로 변환합니다.
	 *
	 * @param entities 엔티티 리스트
	 * @return NoticeParameter 리스트
	 */
	public <T extends IdDomain<?>> List<NoticeParameter> adapt(List<T> entities) {
		return entities.stream()
				.map(this::toNoticeParameter)
				.toList();
	}
}
