package proj.pet.testutil.testdouble.member;

import lombok.Builder;
import lombok.Getter;
import proj.pet.member.domain.*;
import proj.pet.testutil.testdouble.TestEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Builder
@Getter
public class TestMember implements TestEntity<Member> {

	public static final String DEFAULT_PROFILE_IMAGE_URL = "https://cdn.intra.42.fr/users/default.png";
	public static final String DEFAULT_OAUTH_ID = "oauthId";
	public static final String DEFAULT_OAUTH_NAME = "oauthName";
	public static final OauthType DEFAULT_OAUTH_TYPE = OauthType.FORTY_TWO;
	public static final String DEFAULT_NICKNAME = "nickname";
	public static final String DEFAULT_STATEMENT = "statement";
	public static final Country DEFAULT_COUNTRY = Country.KOREA;
	public static final Country.Campus DEFAULT_CAMPUS = Country.Campus.SEOUL;
	public static final MemberRole DEFAULT_MEMBER_ROLE = MemberRole.USER;
	public static final LocalDateTime DEFAULT_TIME = LocalDateTime.of(LocalDate.EPOCH, LocalTime.MIDNIGHT);

	@Builder.Default
	private final String profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
	@Builder.Default
	private final String oauthId = DEFAULT_OAUTH_ID;
	@Builder.Default
	private final String oauthName = DEFAULT_OAUTH_NAME;
	@Builder.Default
	private final OauthType oauthType = DEFAULT_OAUTH_TYPE;
	@Builder.Default
	private final Country country = DEFAULT_COUNTRY;
	@Builder.Default
	private final Country.Campus campus = DEFAULT_CAMPUS;
	@Builder.Default
	private final String nickname = DEFAULT_NICKNAME;
	@Builder.Default
	private final String statement = DEFAULT_STATEMENT;
	@Builder.Default
	private final MemberRole memberRole = DEFAULT_MEMBER_ROLE;
	@Builder.Default
	private final LocalDateTime createdAt = DEFAULT_TIME;

	public static Member asDefaultEntity() {
		return TestMember.builder().build().asEntity();
	}
	
	@Override
	public Member asEntity() {
		return Member.of(
				OauthProfile.of(this.oauthType, this.oauthId, this.oauthName),
				this.country,
				this.campus,
				this.nickname,
				this.statement,
				this.memberRole,
				this.createdAt);
	}
}
