package proj.pet.member.domain;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import proj.pet.block.domain.Block;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.follow.domain.Follow;
import proj.pet.reaction.domain.Reaction;
import proj.pet.scrap.domain.Scrap;
import proj.pet.utils.domain.IdDomain;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "MEMBER")
@Getter
@ToString
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
	private String profileImageUrl = null;

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

	@ToString.Exclude
	@OneToMany(mappedBy = "from",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Block> blocks = new ArrayList<>();

	@ToString.Exclude
	@OneToMany(mappedBy = "from",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Follow> followings = new ArrayList<>();

	@ToString.Exclude
	@OneToMany(mappedBy = "to",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Follow> followers = new ArrayList<>();

	@ToString.Exclude
	@OneToMany(mappedBy = "member",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<MemberCategoryFilter> memberCategoryFilters = new ArrayList<>();

	@ToString.Exclude
	@OneToMany(mappedBy = "member",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Reaction> reactions = new ArrayList<>();

	@ToString.Exclude
	@OneToMany(mappedBy = "member",
			fetch = LAZY,
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Scrap> scraps = new ArrayList<>();

	private Member(OauthProfile oauthProfile, Country country, Language language, String nickname,
			String statement, MemberRole memberRole, LocalDateTime now) {
		this.oauthProfile = oauthProfile;
		this.country = country;
		this.language = language;
		this.nickname = nickname;
		this.statement = statement;
		this.memberRole = memberRole;
		this.nicknameUpdatedAt = now;
		this.createdAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static Member of(OauthProfile oauthProfile, Country country, String nickname,
			String statement, MemberRole memberRole, LocalDateTime now) {
		return new Member(oauthProfile, country, country.getDefaultLanguage(), nickname, statement,
				memberRole, now);
	}

	@Override
	public boolean isValid() {
		return oauthProfile != null
				&& country != null
				&& language != null
				&& nickname != null
				&& memberRole != null
				&& nicknameUpdatedAt != null
				&& createdAt != null;
	}

	public void changeNickname(String nickname, LocalDateTime now) {
		this.nickname = nickname;
		this.nicknameUpdatedAt = now;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public void changeProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public void addCategoryFilters(List<MemberCategoryFilter> categoryFilters) {
		this.memberCategoryFilters.addAll(categoryFilters);
		RuntimeExceptionThrower.checkValidity(this);
	}

	public void changeStatement(String statement) {
		this.statement = statement;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public void changeLanguage(Language language) {
		this.language = language;
		RuntimeExceptionThrower.checkValidity(this);
	}
}
