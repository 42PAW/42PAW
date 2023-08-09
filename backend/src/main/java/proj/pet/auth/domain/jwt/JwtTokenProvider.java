package proj.pet.auth.domain.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import proj.pet.auth.domain.FtOauthProperties;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

	private final FtOauthProperties ftOauthProperties;


}
