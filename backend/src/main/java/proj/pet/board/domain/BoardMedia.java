package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "board_media")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class BoardMedia {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", nullable = false, updatable = false)
	private Board board;

	@Column(name = "media_url", nullable = false)
	private String mediaUrl;

	@Column(name = "index", nullable = false)
	private Integer index;

	@Column(name = "media_type", nullable = false)
	private MediaType mediaType;
}
