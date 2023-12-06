package proj.pet.member;

import com.amazonaws.services.s3.AmazonS3;
import jakarta.servlet.http.Cookie;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.board.domain.Board;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Member;
import proj.pet.member.domain.MemberImageManager;
import proj.pet.member.domain.MemberRole;
import proj.pet.member.domain.OauthType;
import proj.pet.member.dto.MemberCreateRequestDto;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.board.TestBoard;
import proj.pet.testutil.testdouble.board.TestBoardMedia;
import proj.pet.testutil.testdouble.category.TestBoardCategoryFilter;
import proj.pet.testutil.testdouble.member.TestMember;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

import static org.apache.http.HttpHeaders.AUTHORIZATION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static proj.pet.testutil.testdouble.board.TestBoardMedia.DEFAULT_MEDIA_URL;

public class MemberControllerTest extends E2ETest {

	private final static String BEARER = "Bearer ";
	private final LocalDateTime now = LocalDateTime.now();
	private final List<Species> categorieds = Arrays.stream(Species.values()).toList();
	private final List<Species> categories = List.of(Species.values());
	private PersistHelper persistHelper;
	@MockBean
	private AmazonS3 amazonS3;
	@MockBean
	private MemberImageManager memberImageManager;

	@BeforeEach
	void setup() {
		persistHelper = PersistHelper.start(em);
	}

	private String randomString() {
		return UUID.randomUUID().toString();
	}

	@Test
	@DisplayName("이름을 사용 중이면 false, 사용 가능하면 true를 반환한다.")
	void validateNickname() throws Exception {
		String nickname = "jpark2";
		String wrongNickname = "testMember";
		Member member = TestMember.builder()
				.nickname(nickname)
				.createdAt(now)
				.build().asEntity();
		em.persist(member);
		String url = "/v1/members/valid";

		MockHttpServletRequestBuilder reqFalse = get(url)
				.param("name", nickname);
		MockHttpServletRequestBuilder reqTrue = get(url)
				.param("name", wrongNickname);

		mockMvc.perform(reqFalse)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("valid").value(false));
		mockMvc.perform(reqTrue)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("valid").value(true));
	}

	@Test
	@DisplayName("간단한 내 정보를 조회할 수 있다.")
	void getMyInfo() throws Exception {
		Member member = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.createdAt(now)
				.build().asEntity();
		em.persist(member);
		String token = stubToken(member, now, 1);

		String url = "/v1/members/me";
		MockHttpServletRequestBuilder req = get(url)
				.header(AUTHORIZATION, BEARER + token);

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("memberName").value(member.getNickname()))
				.andExpect(jsonPath("intraName").value(member.getOauthProfile().getName()))
				.andExpect(jsonPath("profileImageUrl").value(member.getProfileImageUrl()))
				.andExpect(jsonPath("language").value(member.getLanguage().toString()));
	}

	@Test
	@DisplayName("내 프로필을 조회할 수 있다.")
	void getMyProfile() throws Exception {
		Member member = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		em.persist(member);
		String token = stubToken(member, now, 1);

		String url = "/v1/members/me/profile";
		MockHttpServletRequestBuilder req = get(url)
				.header(AUTHORIZATION, BEARER + token);

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("memberName").value(member.getNickname()))
				.andExpect(jsonPath("intraName").value(member.getOauthProfile().getName()))
				.andExpect(jsonPath("profileImageUrl").value(member.getProfileImageUrl()))
				.andExpect(jsonPath("country").value(member.getCountry().toString()))
				.andExpect(jsonPath("campus").value(member.getCampus().toString()))
				.andExpect(jsonPath("statement").value(member.getStatement()))
				.andExpect(jsonPath("followType").value(FollowType.NONE.toString()));
	}

	@Test
	@DisplayName("다른 유저의 프로필을 조회할 수 있다.")
	void getMemberProfile() throws Exception {
		Member member = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		em.persist(member);

		Long memberId = member.getId();
		String url = "/v1/members/" + memberId + "/profile";
		MockHttpServletRequestBuilder req = get(url);

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("memberName").value(member.getNickname()))
				.andExpect(jsonPath("intraName").value(member.getOauthProfile().getName()))
				.andExpect(jsonPath("nicknameUpdatedAt").value(
						member.getNicknameUpdatedAt().toString()))
				.andExpect(jsonPath("profileImageUrl").value(member.getProfileImageUrl()))
				.andExpect(jsonPath("country").value(member.getCountry().toString()))
				.andExpect(jsonPath("campus").value(member.getCampus().toString()))
				.andExpect(jsonPath("statement").value(member.getStatement()))
				.andExpect(jsonPath("followType").value(FollowType.NONE.toString()));
	}

	@Test
	@Disabled // TODO: pre-signed 적용 후 변경 예정
	@DisplayName("내 프로필을 수정할 수 있다.")
	void changeMyProfile() throws Exception {
		Member member = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		em.persist(member);

		String token = stubToken(member, now, 1);
		String newNickname = "cchocobi";
		String newStatement = "최고는 꼬비다";
		MockMultipartFile multipartFile = new MockMultipartFile("mediaDataList",
				"filename-1.jpg", "image/jpeg", "image1".getBytes());
		MemberProfileChangeRequestDto memberProfileChangeRequestDto = new MemberProfileChangeRequestDto(
				newNickname, multipartFile, newStatement, true);

		String url = "/v1/members/me/profile";
		MockHttpServletRequestBuilder req = multipart(url)
				.header(AUTHORIZATION, BEARER + token)
				.contentType("multipart/form-data")
				.content(objectMapper.writeValueAsString(memberProfileChangeRequestDto));

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("memberName").value(newNickname))
				.andExpect(jsonPath("profileImageUrl").value(null))
				.andExpect(jsonPath("statement").value(newStatement));
	}

	@Test
	@DisplayName("내 게시글을 조회할 수 있다.")
	void getMyBoards() throws Exception {
		Member loginUser = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl1")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		Member member = TestMember.builder()
				.nickname("testMember")
				.oauthId("456")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("sanan")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl2")
				.campus(Campus.SEOUL)
				.statement("하루 아버지")
				.createdAt(now)
				.build().asEntity();
		persistHelper.persist(loginUser, member);

		Board board1 = TestBoard.builder().member(loginUser)
				.build().asEntity();
		Board board2 = TestBoard.builder().member(loginUser)
				.build().asEntity();
		persistHelper.persist(board1, board2)
				.and().persist(
						TestBoardMedia.ofMany(
								board1,
								DEFAULT_MEDIA_URL + 0,
								DEFAULT_MEDIA_URL + 1,
								DEFAULT_MEDIA_URL + 2))
				.and().persist(
						TestBoardCategoryFilter.ofMany(
								board1,
								categories.get(0),
								categories.get(1)),
						TestBoardCategoryFilter.ofMany(
								board2,
								categories.get(0)))
				.flushAndClear();

		String token = stubToken(loginUser, now, 28);
		String url = "/v1/members/me/boards";
		MockHttpServletRequestBuilder req = get(url)
				.header(AUTHORIZATION, BEARER + token)
				.param("page", "0")
				.param("size", "10");

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("totalLength").value(2))
				.andExpect(jsonPath("result[0].memberName").value(loginUser.getNickname()))
				.andExpect(jsonPath("result[0].country").value(loginUser.getCountry().toString()))
				.andExpect(jsonPath("result[0].content").value(board1.getContent()))
				.andExpect(jsonPath("result[0].memberName").value(loginUser.getNickname()))
				.andExpect(jsonPath("result[0].categories.size()").value(2))
				.andExpect(jsonPath("result[0].images").value(
						Matchers.hasItems(DEFAULT_MEDIA_URL + 0, DEFAULT_MEDIA_URL + 1,
								DEFAULT_MEDIA_URL + 2)))
				.andExpect(jsonPath("result[1].categories.size()").value(1));
	}

	@Test
	@DisplayName("다른 멤버의 게시글을 조회할 수 있다.")
	void getMemberBoards() throws Exception {
		Member loginUser = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl1")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		Member member = TestMember.builder()
				.nickname("testMember")
				.oauthId("456")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("sanan")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl2")
				.campus(Campus.SEOUL)
				.statement("하루 아버지")
				.createdAt(now)
				.build().asEntity();
		persistHelper.persist(loginUser, member);

		Board board1 = TestBoard.builder().member(member)
				.build().asEntity();
		Board board2 = TestBoard.builder().member(member)
				.build().asEntity();
		persistHelper.persist(board1, board2)
				.and().persist(
						TestBoardMedia.ofMany(
								board1,
								DEFAULT_MEDIA_URL + 0,
								DEFAULT_MEDIA_URL + 1,
								DEFAULT_MEDIA_URL + 2))
				.and().persist(
						TestBoardCategoryFilter.ofMany(
								board1,
								categories.get(0),
								categories.get(1)),
						TestBoardCategoryFilter.ofMany(
								board2,
								categories.get(0)))
				.flushAndClear();

		String token = stubToken(loginUser, now, 28);
		String url = "/v1/members/" + member.getId() + "/boards";
		MockHttpServletRequestBuilder req = get(url)
				.header(AUTHORIZATION, BEARER + token)
				.param("page", "0")
				.param("size", "10");

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("totalLength").value(2))
				.andExpect(jsonPath("result[0].memberName").value(member.getNickname()))
				.andExpect(jsonPath("result[0].country").value(member.getCountry().toString()))
				.andExpect(jsonPath("result[0].content").value(board1.getContent()))
				.andExpect(jsonPath("result[0].memberName").value(member.getNickname()))
				.andExpect(jsonPath("result[0].categories.size()").value(2))
				.andExpect(jsonPath("result[0].images").value(
						Matchers.hasItems(DEFAULT_MEDIA_URL + 0, DEFAULT_MEDIA_URL + 1,
								DEFAULT_MEDIA_URL + 2)))
				.andExpect(jsonPath("result[1].categories.size()").value(1));
	}

	@Test
	@DisplayName("태그된 이름으로 멤버를 찾을 수 있다.")
	void getTaggingMember() throws Exception {
		Member member1 = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		Member member2 = TestMember.builder()
				.nickname("jpark2")
				.oauthId("124")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("sanan")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("statement")
				.createdAt(now)
				.build().asEntity();
		Member member3 = TestMember.builder()
				.nickname("jpark3")
				.oauthId("125")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("dojeong")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("statement")
				.createdAt(now)
				.build().asEntity();
		Member member4 = TestMember.builder()
				.nickname("choco")
				.oauthId("126")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("mingkang")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("감귤왕자")
				.createdAt(now)
				.build().asEntity();
		persistHelper.persist(member1, member2, member3, member4);

		String token = stubToken(member1, now, 28);
		String url = "/v1/members/tagging";
		MockHttpServletRequestBuilder req1 = get(url)
				.header(AUTHORIZATION, BEARER + token)
				.param("name", "jpark2");
		MockHttpServletRequestBuilder req2 = get(url)
				.header(AUTHORIZATION, BEARER + token)
				.param("name", "jpark");

		mockMvc.perform(req1)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("memberName").value(member2.getNickname()))
				.andExpect(jsonPath("intraName").value(member2.getOauthProfile().getName()));
		mockMvc.perform(req2)
				.andDo(print())
				.andExpect(status().isNotFound());
	}

	@Test
	@DisplayName("설정 언어를 변경할 수 있다.")
	void changeLanguage() throws Exception {
		Member member = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		em.persist(member);

		String token = stubToken(member, now, 1);
		Language language = Language.ENGLISH;
		MemberLanguageChangeRequestDto memberLanguageChangeRequestDto =
				new MemberLanguageChangeRequestDto(language);

		String url = "/v1/members/me/language";
		MockHttpServletRequestBuilder req = patch(url)
				.header(AUTHORIZATION, BEARER + token)
				.contentType("application/json")
				.content(objectMapper.writeValueAsString(memberLanguageChangeRequestDto));

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk());

		persistHelper.flushAndClear();
		Member updatedMember = em.find(Member.class, member.getId());
		assertThat(updatedMember.getLanguage()).isEqualTo(language);
	}

	@Test
	@DisplayName("이름으로 유저를 검색할 수 있다.")
	void searchMemberByName() throws Exception {
		Member member1 = TestMember.builder()
				.nickname("ccobi")
				.oauthId("123")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark2")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("꼬비가 최고다")
				.createdAt(now)
				.build().asEntity();
		Member member2 = TestMember.builder()
				.nickname("asdf")
				.oauthId("124")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("jpark3")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("statement")
				.createdAt(now)
				.build().asEntity();
		Member member3 = TestMember.builder()
				.nickname("sungjp")
				.oauthId("125")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("qwer")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("statement")
				.createdAt(now)
				.build().asEntity();
		Member member4 = TestMember.builder()
				.nickname("choco")
				.oauthId("126")
				.oauthType(OauthType.FORTY_TWO)
				.oauthName("mingkang")
				.memberRole(MemberRole.USER)
				.profileImageUrl("profileUrl")
				.campus(Campus.SEOUL)
				.statement("감귤왕자")
				.createdAt(now)
				.build().asEntity();
		persistHelper.persist(member1, member2, member3, member4);

		String url = "/v1/members/search";
		MockHttpServletRequestBuilder req = get(url)
				.param("name", "jp")
				.param("page", "0")
				.param("size", "10");

		mockMvc.perform(req)
				.andDo(print())
				.andExpect(status().isOk())
				.andExpect(jsonPath("totalLength").value(3))
				.andExpect(jsonPath("result[0].memberName").value(member1.getNickname()))
				.andExpect(jsonPath("result[1].memberName").value(member2.getNickname()))
				.andExpect(jsonPath("result[2].memberName").value(member3.getNickname()));
	}

	@Nested
	@DisplayName("POST /v1/members")
	class CreateMember {

		private final String url = "/v1/members";

		@BeforeEach
		void setup() {
			given(memberImageManager.uploadMemberProfileImage(any())).willReturn(randomString());
			em.createNativeQuery("ALTER TABLE member ALTER COLUMN id RESTART WITH 1")
					.executeUpdate();
		}

		@Test
		@DisplayName("42 OAuth 사용자는 회원 가입을 할 수 있다.")
		void createMember() throws Exception {
			Member noneRegisteredMember = TestMember.builder()
					.oauthId("131541")
					.oauthType(OauthType.FORTY_TWO)
					.oauthName("sanan")
					.memberRole(MemberRole.NOT_REGISTERED)
					.build().asMockEntity(1L);

			String token = stubToken(noneRegisteredMember, now, 1);

			MemberCreateRequestDto memberCreateRequestDto = new MemberCreateRequestDto("sanan", "profileImageUrl", "안녕하세요?", categorieds);
			MockHttpServletRequestBuilder req = post(url)
					.contentType(APPLICATION_JSON)
					.cookie(new Cookie("access_token", token))
					.content(objectMapper.writeValueAsString(memberCreateRequestDto))
					.header(AUTHORIZATION, BEARER + token);

			AtomicReference<String> tokenReference = new AtomicReference<>();
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(result -> {
						Member member = em.find(Member.class, noneRegisteredMember.getId());
						assertThat(member.getMemberRole()).isEqualTo(MemberRole.USER);
						assertThat(member.getOauthProfile().getId()).isEqualTo(
								noneRegisteredMember.getOauthProfile().getId());
						assertThat(member.getOauthProfile().getName()).isEqualTo(
								noneRegisteredMember.getOauthProfile().getName());
						assertThat(member.getOauthProfile().getType()).isEqualTo(
								noneRegisteredMember.getOauthProfile().getType());
						assertThat(member.getNickname()).isEqualTo("sanan");
						assertThat(member.getStatement()).isEqualTo("안녕하세요?");
					});
		}

		@DisplayName("프로필 이미지를 업로드하지 않으면 null로 입력된다.")
		@Test
		void createMember2() throws Exception {
			Member noneRegisteredMember = TestMember.builder()
					.oauthName("sanan")
					.oauthId("sadfasdf")
					.oauthType(OauthType.FORTY_TWO)
					.nickname("sanan")
					.memberRole(MemberRole.NOT_REGISTERED)
					.build().asMockEntity(1L);

			String token = stubToken(noneRegisteredMember, now, 1);


			MemberCreateRequestDto memberCreateRequestDto = new MemberCreateRequestDto("sanan", null, "안녕하세요?", categorieds);

			MockHttpServletRequestBuilder req = post(url)
					.contentType(APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(memberCreateRequestDto))
					.cookie(new Cookie("access_token", token))
					.header(AUTHORIZATION, BEARER + token);

			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(e -> {
						Member member = em.find(Member.class, noneRegisteredMember.getId());
						assertThat(member.getMemberRole()).isEqualTo(MemberRole.USER);
						assertThat(member.getOauthProfile().getId()).isEqualTo(
								noneRegisteredMember.getOauthProfile().getId());
						assertThat(member.getOauthProfile().getName()).isEqualTo(
								noneRegisteredMember.getOauthProfile().getName());
						assertThat(member.getOauthProfile().getType()).isEqualTo(
								noneRegisteredMember.getOauthProfile().getType());
						assertThat(member.getNickname()).isEqualTo("sanan");
						assertThat(member.getStatement()).isEqualTo("안녕하세요?");
						assertThat(member.getProfileImageUrl()).isNull();
					});
		}

	}
}
