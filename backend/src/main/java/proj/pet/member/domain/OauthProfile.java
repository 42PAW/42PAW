package proj.pet.member.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.pet.utils.domain.RuntimeExceptionThrower;
import proj.pet.utils.domain.Validatable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class OauthProfile implements Validatable {

	@Column(name = "OAUTH_TYPE", nullable = false)
	private OauthType type;

	@Column(name = "OAUTH_ID", nullable = false)
	private String id;

	@Column(name = "OAUTH_NAME")
	private String name;

	private OauthProfile(OauthType type, String id, String name) {
		this.type = type;
		this.id = id;
		this.name = name;
		RuntimeExceptionThrower.checkValidity(this);
	}

	public static OauthProfile of(OauthType type, String id, String oauthName) {
		return new OauthProfile(type, id, oauthName);
	}

	@Override public boolean isValid() {
		return type != null
				&& id != null;
	}
}
