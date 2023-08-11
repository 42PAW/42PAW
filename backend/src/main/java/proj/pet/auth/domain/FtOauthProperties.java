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

	@Value("${cloud.oauth2.client.provider.ft.authorization-uri}")
	private String authorizationUri;

	@Value("${cloud.oauth2.client.provider.ft.token-uri}")
	private String accessTokenRequestUri;

	@Value("${cloud.oauth2.client.provider.ft.user-info-uri}")
	private String userInfoRequestUri;

	@Value("${cloud.oauth2.client.provider.ft.callback-uri}")
	private String redirectUri;

	@Value("${cloud.oauth2.client.credentials.ft.client-id}")
	private String clientId;

	@Value("${cloud.oauth2.client.credentials.ft.client-secret}")
	private String clientSecret;

}
