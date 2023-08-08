package proj.pet.auth.domain;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class FtOauthProperties implements OauthProperties {

	@Value("${cloud.oauth2.client.registration.ft.name}")
	private String providerName;

	@Value("${cloud.oauth2.client.registration.ft.grant-type}")
	private String grantType;

	@Value("${cloud.oauth2.client.registration.ft.token-grant-type}")
	private String tokenGrantType;

	@Value("${cloud.oauth2.client.registration.ft.access-token-name}")
	private String accessTokenName;

	@Value("${cloud.oauth2.client.registration.ft.scope}")
	private String scope;

	/**/

	@Value("${cloud.oauth2.client.provider.ft.authorization-uri}")
	private String authorizationUri;

	@Value("${cloud.oauth2.client.provider.ft.token-uri}")
	private String accessTokenRequestUri;

	@Value("${cloud.oauth2.client.provider.ft.user-info-uri}")
	private String userInfoRequestUri;

	@Value("${spring.auth.ft.client-id}")
	private String clientId;

	@Value("${spring.auth.ft.client-secret}")
	private String clientSecret;

	@Value("${spring.urls.user-login-callback}")
	private String redirectUri;

	@Value("${spring.oauth2.client.registration.provider.ft.users-info-uri}")
	private String usersInfoUri;

}
