package proj.pet.auth.service;

import java.util.Map;

public interface AuthService {

	void addUserIfNotExist(Map<String, Object> claims);
}
