package proj.pet.auth.domain.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	/**
	 * JWT 토큰을 생성합니다.
	 *
	 * @param payload    토큰의 페이로드
	 * @param signingKey 서명에 사용할 키
	 * @param expiryDays 토큰 만료일
	 * @param now        토큰 생성 시간
	 * @return 생성된 토큰
	 */
	public String createToken(JwtPayload payload, Key signingKey, long expiryDays, LocalDateTime now) {
		return Jwts.builder()
				.setClaims(payload.toClaims())
				.signWith(signingKey, SignatureAlgorithm.HS256)
				.setExpiration(Timestamp.valueOf(now.plusDays(expiryDays)))
				.compact();
	}
}
