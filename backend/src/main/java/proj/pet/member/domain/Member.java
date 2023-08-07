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

	@Enumerated(EnumType.STRING)
	@Column(name = "COUNTRY", nullable = false, length = 32)
	private Country country;

	@Enumerated(EnumType.STRING)
	@Column(name = "LANGUAGE", nullable = false, length = 32)
	private Language language;

	@Column(name = "PROFILE_IMAGE_URL")
	private String profileImageUrl;

	@Column(name = "NICKNAME", nullable = false, length = 12)
	private String nickname;

	@Column(name = "NICKNAME_UPDATED_AT", nullable = false)
	private LocalDateTime nicknameUpdatedAt;

	@Column(name = "STATEMENT", length = 30)
	private String statement;

	@Enumerated(EnumType.STRING)
	@Column(name = "ROLE", nullable = false, length = 32)
	private MemberRole memberRole;

	@Column(name = "CREATED_AT", nullable = false)
	private LocalDateTime createdAt;

	@Column(name = "DELETED_AT")
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
