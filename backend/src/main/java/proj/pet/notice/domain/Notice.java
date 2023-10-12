package proj.pet.notice.domain;

import jakarta.persistence.*;
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
	@Enumerated(EnumType.STRING)
	@Column(name = "NOTICE_TYPE")
	private NoticeType noticeType;
	@Column(name = "PARAMETERS", nullable = false)
	private String parameters;
	@Column(name = "READ_AT")
	private LocalDateTime readAt;
	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	private Notice(Long receiverId, NoticeType noticeType, String parameters, LocalDateTime readAt, LocalDateTime createdAt) {
		this.receiverId = receiverId;
		this.noticeType = noticeType;
		this.parameters = parameters;
		this.readAt = readAt;
		this.createdAt = createdAt;
	}

	public static Notice of(Long receiverId, NoticeType noticeType, String parameters, LocalDateTime createdAt) {
		return new Notice(receiverId, noticeType, parameters, null, createdAt);
	}

	public List<String> extractParameters() {
		return List.of(parameters.split(","));
	}

	public void markAsRead(LocalDateTime readAt) {
		this.readAt = readAt;
	}

	@Override public boolean isValid() {
		return receiverId != null
				&& parameters != null;
	}
}
