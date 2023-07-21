package proj.pet.member.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.block.domain.Block;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.comment.domain.Comment;
import proj.pet.follow.domain.Follow;
import proj.pet.reaction.domain.Reaction;
import proj.pet.report.domain.Report;
import proj.pet.scrap.domain.Scrap;

import java.time.LocalDateTime;
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

	@Column(name = "profile_image_name")
	private String profileImageName;

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

	@OneToMany(mappedBy = "from", fetch = LAZY)
	private List<Block> blocks;

	@OneToMany(mappedBy = "from", fetch = LAZY)
	private List<Follow> followings;

	@OneToMany(mappedBy = "to", fetch = LAZY)
	private List<Follow> followers;

	@OneToMany(mappedBy = "member", fetch = LAZY)
	private List<MemberCategoryFilter> memberCategoryFilters;

	@OneToMany(mappedBy = "member", fetch = LAZY)
	private List<Scrap> scraps;

	@OneToMany(mappedBy = "member", fetch = LAZY)
	private List<Comment> comments;

	@OneToMany(mappedBy = "member", fetch = LAZY)
	private List<Reaction> reactions;

	@OneToMany(mappedBy = "from", fetch = LAZY)
	private List<Report> reportList;

	@OneToMany(mappedBy = "to", fetch = LAZY)
	private List<Report> reportedList;
}
