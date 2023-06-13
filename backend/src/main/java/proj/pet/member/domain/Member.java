package proj.pet.member.domain;

import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "MEMBER")
@Getter
public class Member {

	@Id
	@GeneratedValue(strategy = AUTO)
	private Long id;

	@Column(name = "oauth_type", nullable = false)
	private OauthType oauthType;

	@Column(name = "oauth_id", nullable = false)
	private String oauthId;

	@Column(name = "nickname", nullable = false, length = 12)
	private String nickname;

	@Column(name = "statement", length = 30)
	private String statement;

	@Column(name = "role", nullable = false)
	private Role role;

	@Column(name = "nickname_updated_at", nullable = false)
	private LocalDateTime nicknameUpdatedAt;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

}
