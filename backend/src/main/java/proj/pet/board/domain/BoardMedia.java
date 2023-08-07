package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "BOARD_MEDIA")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class BoardMedia extends IdDomain implements Validatable {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BOARD_ID", nullable = false, updatable = false)
	private Board board;

	@Column(name = "MEDIA_URL", nullable = false)
	private String mediaUrl;

	@Column(name = "INDEX", nullable = false)
	private Integer index;

	@Column(name = "MEDIA_TYPE", nullable = false)
	private MediaType mediaType;

	private BoardMedia(Board board, String mediaUrl, Integer index, MediaType mediaType) {
		this.board = board;
		this.mediaUrl = mediaUrl;
		this.index = index;
		this.mediaType = mediaType;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static BoardMedia of(Board board, String mediaUrl, Integer index, MediaType mediaType) {
		return new BoardMedia(board, mediaUrl, index, mediaType);
	}

	@Override public boolean isValid() {
		return board != null
				&& !board.isNew()
				&& mediaUrl != null
				&& index != null
				&& mediaType != null;
	}
}
