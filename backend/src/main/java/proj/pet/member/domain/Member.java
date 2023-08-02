package proj.pet.member.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.block.domain.Block;
import proj.pet.follow.domain.Follow;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.AUTO;
import static lombok.AccessLevel.PROTECTED;

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

	@Column(name = "profile_image_url")
	private String profileImageUrl;

	@Column(name = "country", nullable = false)
	private Country country;

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

	@OneToMany(mappedBy = "from",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Block> blocks = new ArrayList<>();

	@OneToMany(mappedBy = "from",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Follow> followings = new ArrayList<>();

	@OneToMany(mappedBy = "to",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Follow> followers = new ArrayList<>();
}
