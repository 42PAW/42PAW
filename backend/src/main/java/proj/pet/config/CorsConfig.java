package proj.pet.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import proj.pet.auth.domain.DomainProperties;

@Configuration
@RequiredArgsConstructor
public class CorsConfig implements WebMvcConfigurer {
	private final DomainProperties domainProperties;

	// TODO : CORS 와일드카드 쓰지마라
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost", "http://localhost:4242", "http://localhost:2424", "https://42paw.com", "http://42paw.com")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH")
				.maxAge(3600)
				.allowCredentials(true)
				.allowedHeaders("*");
	}
}