package proj.pet.member;

import com.amazonaws.services.s3.AmazonS3;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Member;
import proj.pet.member.domain.MemberImageManager;
import proj.pet.member.domain.MemberRole;
import proj.pet.member.domain.OauthType;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MemberControllerTest extends E2ETest {

	private final static String BEARER = "Bearer ";
	private final LocalDateTime now = LocalDateTime.now();
	private final List<Species> categorieds = Arrays.stream(Species.values()).toList();
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

	@Nested
	@DisplayName("POST /v1/members")
	class CreateMember {

		private final String url = "/v1/members";

		@BeforeEach
		void setup() {
			given(memberImageManager.uploadMemberProfileImage(any())).willReturn(randomString());
			em.createNativeQuery("ALTER TABLE member ALTER COLUMN id RESTART WITH 1").executeUpdate();
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

			MockMultipartFile imageFile = new MockMultipartFile("imageData", "test.jpg", "image/jpeg", "test".getBytes());
			MockHttpServletRequestBuilder req = multipart(url)
					.file(imageFile)
					.cookie(new Cookie("access_token", token))
					.param("memberName", "sanan")
					.param("statement", "안녕하세요?")
					.param("categoryFilters", categorieds.get(0).name())
					.header(AUTHORIZATION, BEARER + token);

			AtomicReference<String> tokenReference = new AtomicReference<>();
			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(result -> {
						Member member = em.find(Member.class, noneRegisteredMember.getId());
						assertThat(member.getMemberRole()).isEqualTo(MemberRole.USER);
						assertThat(member.getOauthProfile().getId()).isEqualTo(noneRegisteredMember.getOauthProfile().getId());
						assertThat(member.getOauthProfile().getName()).isEqualTo(noneRegisteredMember.getOauthProfile().getName());
						assertThat(member.getOauthProfile().getType()).isEqualTo(noneRegisteredMember.getOauthProfile().getType());
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

			MockHttpServletRequestBuilder req = multipart(url)
					.cookie(new Cookie("access_token", token))
					.param("memberName", "sanan")
					.param("statement", "안녕하세요?")
					.param("categoryFilters", categorieds.get(0).name())
					.header(AUTHORIZATION, BEARER + token);

			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(e -> {
						Member member = em.find(Member.class, noneRegisteredMember.getId());
						assertThat(member.getMemberRole()).isEqualTo(MemberRole.USER);
						assertThat(member.getOauthProfile().getId()).isEqualTo(noneRegisteredMember.getOauthProfile().getId());
						assertThat(member.getOauthProfile().getName()).isEqualTo(noneRegisteredMember.getOauthProfile().getName());
						assertThat(member.getOauthProfile().getType()).isEqualTo(noneRegisteredMember.getOauthProfile().getType());
						assertThat(member.getNickname()).isEqualTo("sanan");
						assertThat(member.getStatement()).isEqualTo("안녕하세요?");
						assertThat(member.getProfileImageUrl()).isNull();
					});
		}

	}
}
