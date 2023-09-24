package proj.pet.notice.domain;

import org.springframework.stereotype.Component;
import proj.pet.board.domain.Board;
import proj.pet.comment.domain.Comment;
import proj.pet.follow.domain.Follow;
import proj.pet.member.domain.Member;
import proj.pet.utils.domain.IdDomain;

import java.util.List;

import static proj.pet.notice.domain.NoticeEntityType.*;

@Component
public class EntityAdaptor {

	public <T extends IdDomain<?>> NoticeParameter toNoticeParameter(T entity) {
		if (entity instanceof Member member) {
			return NoticeParameter.of(formatToParameter(member));
		}
		if (entity instanceof Board board) {
			return NoticeParameter.of(formatToParameter(board));
		}
		if (entity instanceof Comment comment) {
			return NoticeParameter.of(formatToParameter(comment));
		}
		if (entity instanceof Follow follow) {
			return NoticeParameter.of(formatToParameter(follow));
		}
		throw new IllegalArgumentException("Not supported entity type");
	}

	/**
	 * 멤버로 딥링크를 연결하는 문자열을 반환합니다.
	 * <p>
	 * ex) {MBR/1/sanan}
	 *
	 * @param member
	 * @return {MBR/$id/$nickname}
	 */
	private String formatToParameter(Member member) {
		return String.format(MEMBER.getPlaceholder(), member.getId(), member.getNickname());
	}

	/**
	 * 게시글로 딥링크를 연결하는 문자열을 반환합니다.
	 * <p>
	 * 작성자의 닉네임을 포함합니다.
	 * <p>
	 * ex) {BRD/1/sanan}
	 *
	 * @param board
	 * @return {BRD/$boardId/$authorNickname}
	 */
	private String formatToParameter(Board board) {
		return String.format(BOARD.getPlaceholder(), board.getId(), board.getMember().getId());
	}

	/**
	 * 댓글로 딥링크를 연결하는 문자열을 반환합니다.
	 * <p>
	 * 작성자의 닉네임을 포함합니다.
	 * <p>
	 * ex) {CMT/1/sanan}
	 *
	 * @param comment
	 * @return {CMT/$commentId/$authorNickname}
	 */
	private String formatToParameter(Comment comment) {
		Member author = comment.getMember();
		return String.format(COMMENT.getPlaceholder(), author.getId(), author.getNickname());
	}

	/**
	 * 팔로우로 딥링크를 연결하는 문자열을 반환합니다.
	 * <p>
	 * 팔로우를 요청한 사람의 닉네임을 포함합니다.
	 * <p>
	 * ex) {FLW/1/sanan}
	 *
	 * @param follow 팔로우
	 * @return {FOL/$fromId/$fromNickname}
	 */
	private String formatToParameter(Follow follow) {
		Member member = follow.getFrom();
		return String.format(FOLLOW.getPlaceholder(), member.getId(), member.getNickname());
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
