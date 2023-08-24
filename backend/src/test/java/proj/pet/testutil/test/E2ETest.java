package proj.pet.testutil.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import proj.pet.auth.domain.jwt.JwtProperties;
import proj.pet.member.domain.Member;
import proj.pet.testutil.ExternalDependenciesBreaker;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Import(ExternalDependenciesBreaker.class)
@Transactional
public abstract class E2ETest {

	@PersistenceContext
	protected EntityManager em;
	@Autowired
	protected ObjectMapper objectMapper;
	protected MockMvc mockMvc;
	@Autowired
	private JwtProperties jwtProperties;

	@BeforeEach
	void setup(WebApplicationContext webApplicationContext) {
		mockMvc = MockMvcBuilders
				.webAppContextSetup(webApplicationContext)
				.addFilters(new CharacterEncodingFilter("UTF-8", true))
//				.apply(springSecurity()) <- Spring Security 적용 시
				.build();
	}

	private Map<String, Object> stubPayloadMap(Member member) {
		return Map.of(
				"email", member.getOauthProfile().getId(),
				"oauthId", member.getOauthProfile().getId(),
				"oauthName", member.getOauthProfile().getName(),
				"oauthType", member.getOauthProfile().getType(),
				"campus", member.getCampus(),
				"role", member.getMemberRole()
		);
	}

	protected String stubToken(Member member, LocalDateTime now, int expiryDays) {
		return Jwts.builder()
				.setClaims(stubPayloadMap(member))
				.signWith(jwtProperties.createSigningKey(), SignatureAlgorithm.HS256)
				.setExpiration(Timestamp.valueOf(now.plusDays(expiryDays)))
				.compact();
	}
}
