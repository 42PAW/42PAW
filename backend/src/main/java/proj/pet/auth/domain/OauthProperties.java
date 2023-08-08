package proj.pet.auth.domain;

public interface OauthProperties {
	String getProviderName();

	String getGrantType();

	String getTokenGrantType();

	String getAccessTokenName();

	String getScope();
	
	String getAuthorizationUri();

	String getAccessTokenRequestUri();

	String getUserInfoRequestUri();

	String getClientId();

	String getClientSecret();

	String getRedirectUri();


}
