package proj.pet.member.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.block.domain.Block;
import proj.pet.follow.domain.Follow;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
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

	@Embedded
	private OauthProfile oauthProfile;

	@Column(name = "country", nullable = false)
	@Enumerated(EnumType.STRING)
	private Country country;

	@Column(name = "language", nullable = false)
	@Enumerated(EnumType.STRING)
	private Language language;

	@Column(name = "profile_image_url")
	private String profileImageUrl;

	@Column(name = "nickname", nullable = false, length = 12)
	private String nickname;

	@Column(name = "nickname_updated_at", nullable = false)
	private LocalDateTime nicknameUpdatedAt;

	@Column(name = "statement", length = 30)
	private String statement;

	@Column(name = "role", nullable = false)
	@Enumerated(EnumType.STRING)
	private MemberRole memberRole;

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


	private Member(OauthProfile oauthProfile, String profileImageUrl, Country country, Language language, String nickname, String statement, MemberRole memberRole, LocalDateTime now) {
		this.oauthProfile = oauthProfile;
		this.profileImageUrl = profileImageUrl;
		this.country = country;
		this.language = language;
		this.nickname = nickname;
		this.statement = statement;
		this.memberRole = memberRole;
		this.nicknameUpdatedAt = now;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Member of(OauthProfile oauthProfile, String profileImageUrl, Country country, Language language, String nickname, String statement, MemberRole memberRole, LocalDateTime now) {
		return new Member(oauthProfile, profileImageUrl, country, language, nickname, statement, memberRole, now);
	}

	@Override public boolean isValid() {
		return oauthProfile != null
				&& country != null
				&& language != null
				&& nickname != null
				&& memberRole != null
				&& nicknameUpdatedAt != null
				&& createdAt != null;
	}
}
