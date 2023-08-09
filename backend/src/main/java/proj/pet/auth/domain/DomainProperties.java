package proj.pet.auth.domain;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class DomainProperties {

	@Value("${cloud.oauth2.domain.service}")
	private String serviceDomain;

}
