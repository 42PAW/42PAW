package proj.pet.member.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.block.domain.Block;
import proj.pet.follow.domain.Follow;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.Validatable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "MEMBER")
@Getter
public class Member extends IdDomain implements Validatable {

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
	@Enumerated(EnumType.STRING)
	private MemberRole memberRole;

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


	@Builder
	public Member(OauthType oauthType, String oauthId, String profileImageUrl, Country country, String nickname, String statement, MemberRole memberRole, LocalDateTime now) {
		this.oauthType = oauthType;
		this.oauthId = oauthId;
		this.profileImageUrl = profileImageUrl;
		this.country = country;
		this.nickname = nickname;
		this.statement = statement;
		this.memberRole = memberRole;
		this.nicknameUpdatedAt = now;
		this.createdAt = now;
	}

	@Override public boolean isValid() {
		return oauthType != null
				&& oauthId != null
				&& country != null
				&& nickname != null
				&& memberRole != null
				&& nicknameUpdatedAt != null
				&& createdAt != null;
	}
}
