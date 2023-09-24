package proj.pet.notice.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.utils.domain.IdentityDomain;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "NOTICE")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notice extends IdentityDomain {

	private Long receiverId;
	private String title;
	private String format;
	private String parameters;
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
}
