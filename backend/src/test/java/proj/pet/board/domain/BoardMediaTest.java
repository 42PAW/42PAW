package proj.pet.board.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import proj.pet.exception.DomainException;
import proj.pet.testutil.test.UnitTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;

class BoardMediaTest extends UnitTest {

	@DisplayName("Board에 의존하고, mediaUrl, mediaType, index를 가진다.")
	@Test
	void constructor() {
		Board board = mock(Board.class);

		assertThat(BoardMedia.of(board, "mediaUrl", 1, MediaType.IMAGE)).isNotNull();

		assertThatThrownBy(() ->
				BoardMedia.of(null, "mediaUrl", 1, MediaType.IMAGE))
				.isInstanceOf(DomainException.class);

		assertThatThrownBy(() ->
				BoardMedia.of(board, null, 1, MediaType.IMAGE))
				.isInstanceOf(DomainException.class);

		assertThatThrownBy(() ->
				BoardMedia.of(board, "mediaUrl", 1, null))
				.isInstanceOf(DomainException.class);

		assertThatThrownBy(() ->
				BoardMedia.of(board, "mediaUrl", -1, MediaType.IMAGE))
				.isInstanceOf(DomainException.class);
	}

}