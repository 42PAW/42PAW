package proj.pet.notice.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.utils.domain.IdentityDomain;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "NOTICE")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends IdentityDomain implements Validatable {

	@Column(name = "RECEIVER_ID", nullable = false)
	private Long receiverId;
	@Column(name = "TITLE", nullable = false, length = 32)
	private String title;
	@Column(name = "FORMAT", nullable = false) // 추후 구조 변경에 따라 없어질 예정
	private String format;
	@Column(name = "PARAMETERS", nullable = false)
	private String parameters;
	@Column(name = "READ_AT")
	private LocalDateTime readAt;

	private Notice(Long receiverId, String title, String format, String parameters) {
		this.receiverId = receiverId;
		this.title = title;
		this.format = format;
		this.parameters = parameters;
	}

	public static Notice of(Long receiverId, String title, String format, String parameters) {
		return new Notice(receiverId, title, format, parameters);
	}

	public List<String> extractParameters() {
		return List.of(parameters.split(","));
	}

	public void markAsRead() {
		this.readAt = LocalDateTime.now();
	}

	@Override public boolean isValid() {
		return receiverId != null
				&& title != null
				&& format != null
				&& parameters != null;
	}
}
