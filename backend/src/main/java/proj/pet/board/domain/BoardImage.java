package proj.pet.board.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "board_image")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class BoardImage {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", nullable = false, updatable = false, insertable = false)
	private Board board;

	@Column(name = "image_url", nullable = false)
	private String imageUrl;

	@Column(name = "index", nullable = false)
	private Integer index;
}
