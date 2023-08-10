package proj.pet.auth.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@RequiredArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class ApiRequestManager {

	private final OauthProperties oauthProperties;

	public static ApiRequestManager of(OauthProperties oauthProperties) {
		return new ApiRequestManager(oauthProperties);
	}

	/**
	 * 인증 코드(authorization code) 요청을 위한 URI를 생성합니다.
	 *
	 * @return 인증 코드 요청을 위한 URI
	 */
	public String createCodeRequestUri() {
		return String.format("%s?client_id=%s&redirect_uri=%s&scope=%s&response_type=%s",
				oauthProperties.getAuthorizationUri(),
				oauthProperties.getClientId(),
				oauthProperties.getRedirectUri(),
				oauthProperties.getScope(),
				oauthProperties.getGrantType());
	}

	/**
	 * AccessToken 요청을 위한 RequestBodyMap을 생성합니다.
	 *
	 * @param code 인증 코드
	 * @return AccessToken 요청을 위한 RequestBodyMap
	 */
	public MultiValueMap<String, String> getAccessTokenRequestBodyMap(String code) {
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		map.add("client_id", oauthProperties.getClientId());
		map.add("client_secret", oauthProperties.getClientSecret());
		map.add("redirect_uri", oauthProperties.getRedirectUri());
		map.add("grant_type", oauthProperties.getTokenGrantType());
		map.add("code", code);
		return map;
	}
}
