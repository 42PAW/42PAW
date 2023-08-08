package proj.pet.auth.domain;

public interface OauthProperties {
	String getProviderName();

	String getClientId();

	String getClientSecret();

	String getRedirectUri();

	String getGrantType();

	String getTokenGrantType();

	String getAccessTokenName();

	String getTokenUri();

	String getAuthUri();

	String getUserInfoUri();

	String getScope();
}
