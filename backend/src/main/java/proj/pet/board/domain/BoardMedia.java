package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "BOARD_MEDIA")
@Getter
@NoArgsConstructor(access = PROTECTED)
@ToString
public class BoardMedia extends IdentityDomain implements Validatable {

	@ToString.Exclude
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BOARD_ID", nullable = false, updatable = false)
	private Board board;

	@Column(name = "MEDIA_URL", nullable = false)
	private String mediaUrl;

	@Column(name = "MEDIA_INDEX", nullable = false)
	private Integer index;

	@Column(name = "MEDIA_TYPE", nullable = false, length = 32)
	@Enumerated(EnumType.STRING)
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
				&& index != null && index >= 0
				&& mediaType != null;
	}
}
