package proj.pet.testutil.testdouble.board;

import lombok.Builder;
import lombok.Setter;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.domain.MediaType;
import proj.pet.testutil.testdouble.TestEntity;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.mock;

@Builder
@Setter
public class TestBoardMedia implements TestEntity<BoardMedia, Long> {
	public static final String DEFAULT_MEDIA_URL = "default_url";
	public static final MediaType DEFAULT_MEDIA_TYPE = MediaType.IMAGE;
	public static final Integer DEFAULT_INDEX = 0;

	@Builder.Default
	private Board board = null;
	@Builder.Default
	private String mediaUrl = DEFAULT_MEDIA_URL;
	@Builder.Default
	private Integer index = DEFAULT_INDEX;
	@Builder.Default
	private MediaType mediaType = DEFAULT_MEDIA_TYPE;

	public static List<BoardMedia> createEntitiesOf(Board board, String... url) {
		AtomicInteger index = new AtomicInteger(0);
		return Arrays.stream(url).map(
				mediaUrl -> TestBoardMedia.builder()
						.board(board)
						.mediaUrl(mediaUrl)
						.index(index.getAndIncrement())
						.build()
						.asEntity()
		).collect(Collectors.toList());
	}

	public static BoardMedia asDefaultEntity(Board board) {
		return TestBoardMedia.builder().board(board).build().asEntity();
	}

	@Override
	public BoardMedia asEntity() {
		return BoardMedia.of(
				this.board,
				this.mediaUrl,
				this.index,
				this.mediaType);
	}

	@Override public BoardMedia asMockEntity(Long id) {
		BoardMedia boardMedia = mock(BoardMedia.class);
		lenient().when(boardMedia.getId()).thenReturn(id);
		lenient().when(boardMedia.getBoard()).thenReturn(this.board);
		lenient().when(boardMedia.getMediaUrl()).thenReturn(this.mediaUrl);
		lenient().when(boardMedia.getIndex()).thenReturn(this.index);
		lenient().when(boardMedia.getMediaType()).thenReturn(this.mediaType);
		return boardMedia;
	}
}
