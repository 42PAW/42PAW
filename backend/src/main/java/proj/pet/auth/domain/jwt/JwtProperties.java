package proj.pet.auth.domain.jwt;

import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;

@Component
@Getter
public class JwtProperties {
	@Value("${cloud.oauth2.jwt.secret-key}")
	private String secret;

	@Value("${cloud.oauth2.jwt.token.name}")
	private String tokenName;

	@Value("${cloud.oauth2.jwt.token.expiry}")
	private Integer expiry;

	public Key getSigningKey() {
		byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(this.secret);
		return new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());
	}
}
