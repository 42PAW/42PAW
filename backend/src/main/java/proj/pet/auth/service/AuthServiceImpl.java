package proj.pet.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	@Override public void addUserIfNotExist(Map<String, Object> claims) {
		System.out.println("어 그래 유저 만들었다~");
	}
}
