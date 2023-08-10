package proj.pet.auth.domain.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	public String createToken(Map<String, Object> claims, Key signingKey, long expiryDays, LocalDateTime now) {
		return Jwts.builder()
				.setClaims(claims)
				.signWith(signingKey, SignatureAlgorithm.HS256)
				.setExpiration(Timestamp.valueOf(now.plusDays(expiryDays)))
				.compact();
	}
}
