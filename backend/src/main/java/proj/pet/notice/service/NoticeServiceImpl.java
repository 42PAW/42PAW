package proj.pet.notice.service;

import static proj.pet.exception.ExceptionStatus.MALFORMED_ENTITY;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_BOARD;
import static proj.pet.exception.ExceptionStatus.NOT_FOUND_MEMBER;

import java.util.List;
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

	private List<NoticeParameterDto> getParameters(Notice notice) {
		return notice.extractParameters().stream()
				.map(parameter -> {
					String[] parameterList = parameter.split("/");
					NoticeEntityType type = NoticeEntityType.from(parameterList[0]);
					Long id = Long.parseLong(parameterList[1]);
					if (type.equals(NoticeEntityType.BOARD)) {
						return noticeMapper.toNoticeParameterDto(type, id, null);
					}
					return noticeMapper.toNoticeParameterDto(type, id, parameterList[2]);
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
