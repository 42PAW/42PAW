package proj.pet.board.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import proj.pet.exception.DomainException;
import proj.pet.member.domain.Member;
import proj.pet.member.repository.MemberRepository;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class BoardTest {

	@Mock
	private MemberRepository memberRepository = mock(MemberRepository.class);

	@Test
	@DisplayName("영속된 Member에 의존하고, visibleScope, content, updatedAt, createdAt이 null이 아니어야 한다.")
	void constructor() {
		Member notNullMember = mock(Member.class);
		LocalDateTime now = LocalDateTime.now();

		assertThat(Board.of(notNullMember, VisibleScope.PUBLIC, "content", now)).isNotNull();

		assertThatThrownBy(() ->
				Board.of(null, VisibleScope.PUBLIC, "content", now))
				.isInstanceOf(DomainException.class);

		assertThatThrownBy(() ->
				Board.of(notNullMember, null, "content", now))
				.isInstanceOf(DomainException.class);

		assertThatThrownBy(() ->
				Board.of(notNullMember, VisibleScope.PUBLIC, null, now))
				.isInstanceOf(DomainException.class);

		assertThatThrownBy(() ->
				Board.of(notNullMember, VisibleScope.PUBLIC, "content", null))
				.isInstanceOf(DomainException.class);
	}
}