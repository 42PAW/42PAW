package proj.pet.testutil.testdouble.member;

import lombok.Builder;
import lombok.Getter;
import proj.pet.member.domain.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Builder
@Getter
public class TestMember {

	public static final String DEFAULT_PROFILE_IMAGE_URL = "https://cdn.intra.42.fr/users/default.png";
	public static final OauthProfile DEFAULT_OAUTH_PROFILE = OauthProfile.of(OauthType.FORTY_TWO, "id", "oauthName");
	public static final String DEFAULT_NICKNAME = "nickname";
	public static final String DEFAULT_STATEMENT = "statement";
	public static final Country DEFAULT_COUNTRY = Country.KOREA;
	public static final Country.Campus DEFAULT_CAMPUS = Country.Campus.SEOUL;
	public static final Language DEFAULT_LANGUAGE = Language.KOREAN;
	public static final MemberRole DEFAULT_MEMBER_ROLE = MemberRole.USER;
	public static final LocalDateTime DEFAULT_NICKNAME_UPDATED_AT = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);

	@Builder.Default
	private final String profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
	@Builder.Default
	private final OauthProfile oauthProfile = DEFAULT_OAUTH_PROFILE;
	@Builder.Default
	private final Country country = DEFAULT_COUNTRY;
	@Builder.Default
	private final Country.Campus campus = DEFAULT_CAMPUS;
	@Builder.Default
	private final Language language = DEFAULT_LANGUAGE;
	@Builder.Default
	private final String nickname = DEFAULT_NICKNAME;
	@Builder.Default
	private final LocalDateTime nicknameUpdatedAt = DEFAULT_NICKNAME_UPDATED_AT;
	@Builder.Default
	private final String statement = DEFAULT_STATEMENT;
	@Builder.Default
	private final MemberRole memberRole = DEFAULT_MEMBER_ROLE;
	@Builder.Default
	private final LocalDateTime createdAt = DEFAULT_TIME;
	@Builder.Default
	private final LocalDateTime deletedAt = null;

	public Member asEntity() {
		return Member.of(
				this.oauthProfile,
				this.country,
				this.campus,
				this.nickname,
				this.statement,
				this.memberRole,
				this.createdAt);
	}
}
