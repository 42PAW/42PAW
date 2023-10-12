package proj.pet.notice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.exception.DomainException;
import proj.pet.mapper.NoticeMapper;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.notice.domain.Notice;
import proj.pet.notice.domain.NoticeEntityType;
import proj.pet.notice.dto.NoticeDto;
import proj.pet.notice.dto.NoticeParameterDto;
import proj.pet.notice.dto.NoticeResponseDto;
import proj.pet.notice.repository.NoticeRepository;

import java.time.LocalDateTime;
import java.util.List;

import static proj.pet.exception.ExceptionStatus.*;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final NoticeMapper noticeMapper;

	@Override
	public NoticeResponseDto getMyNotice(Long loginMemberId, PageRequest pageRequest) {
		Page<Notice> notices = noticeRepository.findAllByReceiverId(loginMemberId, pageRequest);
		List<NoticeDto> result = notices.stream().map(notice -> {
			List<NoticeParameterDto> parameters = getParameters(notice);
			NoticeEntityType thumbnailEntity = notice.getNoticeType().getThumbnailEntity();
			NoticeParameterDto thumbnailParameter = parameters.stream()
					.filter(parameter -> parameter.getType().equals(thumbnailEntity)).findFirst()
					.orElseThrow(() -> new DomainException(MALFORMED_ENTITY));
			String thumbnailUrl = getThumbnailUrl(thumbnailEntity, thumbnailParameter.getId());
			return noticeMapper.toNoticeDto(notice, parameters, thumbnailUrl);
		}).toList();
		return noticeMapper.toNoticeResponseDto(result, notices.getTotalElements());
	}

	@Override
	public NoticeResponseDto getUnreadNotice(Long memberId) {
		List<Notice> notices = noticeRepository.findAllUnreadByReceiverId(memberId);
		List<NoticeDto> result = notices.stream().map(notice -> {
			List<NoticeParameterDto> parameters = getParameters(notice);
			NoticeEntityType thumbnailEntity = notice.getNoticeType().getThumbnailEntity();
			NoticeParameterDto thumbnailParameter = parameters.stream()
					.filter(parameter -> parameter.getType().equals(thumbnailEntity)).findFirst()
					.orElseThrow(() -> new DomainException(MALFORMED_ENTITY));
			String thumbnailUrl = getThumbnailUrl(thumbnailEntity, thumbnailParameter.getId());
			return noticeMapper.toNoticeDto(notice, parameters, thumbnailUrl);
		}).toList();
		return noticeMapper.toNoticeResponseDto(result, notices.size());
	}

	@Override
	public void readNotice(Long memberId, List<Long> noticeIds) {
		LocalDateTime now = LocalDateTime.now();
		List<Notice> notices = noticeRepository.findAllById(noticeIds);

		if (notices.stream().anyMatch(notice -> !notice.getReceiverId().equals(memberId)))
			throw UNAUTHENTICATED.asServiceException();
		notices.forEach(notice -> notice.markAsRead(now));
	}

	private List<NoticeParameterDto> getParameters(Notice notice) {
		return notice.extractParameters().stream()
				.map(parameter -> {
					String[] parameterList = parameter.split("/");
					NoticeEntityType type = NoticeEntityType.from(parameterList[0]);
					Long id = 0L;
					if (type.equals(NoticeEntityType.BOARD)) {
						id = Long.parseLong(parameterList[1]);
						return noticeMapper.toNoticeParameterDto(type, id, null);
					}
					if (type.equals(NoticeEntityType.MEMBER))
						id = Long.parseLong(parameterList[2]);
					return noticeMapper.toNoticeParameterDto(type, id, parameterList[1]);
				}).toList();
	}

	private String getThumbnailUrl(NoticeEntityType type, Long id) {
		if (type.equals(NoticeEntityType.MEMBER)) {
			Member member = memberRepository.findById(id).orElseThrow(
					() -> new DomainException(NOT_FOUND_MEMBER));
			return member.getProfileImageUrl();
		} else if (type.equals(NoticeEntityType.BOARD)) {
			Board board = boardRepository.findById(id)
					.orElseThrow(() -> new DomainException(NOT_FOUND_BOARD));
			return board.getMediaList().get(0).getMediaUrl();
		} else {
			throw new DomainException(MALFORMED_ENTITY);
		}
	}
}
