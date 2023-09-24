package proj.pet.category.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import proj.pet.category.domain.MemberCategoryFilter;
import proj.pet.category.domain.Species;
import proj.pet.category.dto.CategoryUpdateRequestDto;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.UserSessionDto;
import proj.pet.testutil.PersistHelper;
import proj.pet.testutil.test.E2ETest;
import proj.pet.testutil.testdouble.category.TestMemberCategoryFilter;
import proj.pet.testutil.testdouble.member.TestMember;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class CategoryControllerTest extends E2ETest {

	private static final String BEARER = "Bearer ";
	private static final String JSON_CONTENT_TYPE = "application/json";
	private final List<Species> categories = List.of(Species.values());
	private PersistHelper persistHelper;
	private Member loginUser;
	private Member otherUser;

	@BeforeEach
	void setUp() {
		persistHelper = PersistHelper.start(em);
		loginUser = TestMember.asDefaultEntity();
		otherUser = TestMember.builder()
				.oauthName("otherUser")
				.build().asEntity();
	}

	/**
	 * req : {@link UserSessionDto}, {@link CategoryUpdateRequestDto}
	 */
	@Nested
	@DisplayName("PATCH /v1/categories/members/me")
	class UpdateMyCategories {

		private final String url = "/v1/categories/members/me";
		private final LocalDateTime now = LocalDateTime.now();

		@Test
		@DisplayName("사용자는 본인의 동물 카테고리 필터를 수정할 수 있다.")
		void updateMyCategories() throws Exception {
			persistHelper.persist(loginUser);
			loginUser.setCategoryFilters(
					TestMemberCategoryFilter.ofMany(loginUser, categories.get(0),
							categories.get(1)));
			persistHelper.flushAndClear();

			String token = stubToken(loginUser, now, 28);
			CategoryUpdateRequestDto dto = new CategoryUpdateRequestDto(
					List.of(Species.AMPHIBIAN, Species.BIRD, Species.SMALL_ANIMAL));
			MockHttpServletRequestBuilder req = patch(url)
					.header(HttpHeaders.AUTHORIZATION, BEARER + token)
					.contentType(JSON_CONTENT_TYPE)
					.content(objectMapper.writeValueAsString(dto));

			mockMvc.perform(req)
					.andDo(print())
					.andExpect(status().isOk())
					.andDo(e -> {
						Member member = em.find(Member.class, loginUser.getId());
						List<MemberCategoryFilter> categories = member.getMemberCategoryFilters();
						assertThat(categories).hasSize(3);
						assertThat(categories)
								.extracting(MemberCategoryFilter::getSpecies)
								.containsExactlyInAnyOrder(Species.AMPHIBIAN, Species.BIRD,
										Species.SMALL_ANIMAL);
					});


		}

	}

	/**
	 * req : {@link UserSessionDto}, {@link CategoryUpdateRequestDto}, {@link Long boardId}
	 */
	@Nested
	@DisplayName("PATCH /v1/categories/boards/{boardId}")
	class UpdateBoardCategories {

		@Test
//		@DisplayName("")
		void updateBoardCategories() throws Exception {

		}

	}
}