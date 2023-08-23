package proj.pet.testutil.testdouble.board;

import lombok.Builder;
import lombok.Setter;
import proj.pet.board.domain.Board;
import proj.pet.board.domain.BoardMedia;
import proj.pet.board.domain.MediaType;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Builder
@Setter
public class TestBoardMedia {
	public static final String DEFAULT_MEDIA_URL = "default_url";
	public static final MediaType DEFAULT_MEDIA_TYPE = MediaType.IMAGE;
	public static final Integer DEFAULT_INDEX = 0;

	private Board board;
	@Builder.Default
	private String mediaUrl = DEFAULT_MEDIA_URL;
	@Builder.Default
	private Integer index = DEFAULT_INDEX;
	@Builder.Default
	private MediaType mediaType = DEFAULT_MEDIA_TYPE;

	public BoardMedia asEntity() {
		return BoardMedia.of(
				this.board,
				this.mediaUrl,
				this.index,
				this.mediaType);
	}

	public List<BoardMedia> asEntitiesOfCount(int count) {

		return IntStream.range(0, count)
				.mapToObj(i -> {
					this.index = i;
					this.mediaUrl = DEFAULT_MEDIA_URL + i;
					return this.asEntity();
				})
				.collect(Collectors.toList());
	}
}
