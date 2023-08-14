package proj.pet.scrap.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.board.domain.Board;
import proj.pet.board.repository.BoardRepository;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;
import proj.pet.scrap.domain.Scrap;
import proj.pet.scrap.repository.ScrapRepository;

import java.time.LocalDateTime;

import static proj.pet.exception.ExceptionStatus.*;

@Service
@RequiredArgsConstructor
public class ScrapServiceImpl implements ScrapService {
	private static final Long NOT_REGISTERED_ID = 0L;
	private final MemberRepository memberRepository;
	private final BoardRepository boardRepository;
	private final ScrapRepository scrapRepository;

	@Override public void createScrap(Long memberId, Long boardId) {
		if (memberId.equals(NOT_REGISTERED_ID)) {
			throw UNAUTHORIZED.asServiceException();
		}
		Member loginUser = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Board board = boardRepository.findById(boardId).orElseThrow(NOT_FOUND_BOARD::asServiceException);
		scrapRepository.save(Scrap.of(loginUser, board, LocalDateTime.now()));
	}

	@Override public void deleteScrap(Long memberId, Long boardId) {
		if (memberId.equals(NOT_REGISTERED_ID)) {
			throw UNAUTHORIZED.asServiceException();
		}
		Member loginUser = memberRepository.findById(memberId).orElseThrow(NOT_FOUND_MEMBER::asServiceException);
		Scrap scrap = scrapRepository.findByMemberAndBoardId(loginUser.getId(), boardId).orElseThrow(NOT_FOUND_SCRAP::asServiceException);
		scrapRepository.delete(scrap);
	}
}
