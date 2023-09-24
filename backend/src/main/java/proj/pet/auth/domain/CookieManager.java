package proj.pet.auth.domain;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Getter
@RequiredArgsConstructor
public class CookieManager {

	private static final String LOCALHOST = "localhost";
	private final DomainProperties domainProperties;

	/**
	 * 쿠키를 가져옵니다.
	 *
	 * @param req  요청 시의 서블렛 {@link HttpServletRequest}
	 * @param name 쿠키 이름
	 * @return 쿠키 값, 없는 경우 null
	 */
	public String getCookieValue(HttpServletRequest req, String name) {
		Cookie[] cookies = req.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	/**
	 * 쿠키를 설정합니다.
	 *
	 * @param res           요청 시의 서블렛 {@link HttpServletResponse}
	 * @param cookie        쿠키
	 * @param path          쿠키가 사용되는 path
	 * @param currentDomain 쿠키가 사용될 domain
	 * @param expiryDays    쿠키의 만료일
	 */

	public void setCookieToClient(HttpServletResponse res, Cookie cookie, String path,
	                              String currentDomain, int expiryDays) {
		cookie.setMaxAge(60 * 60 * 24 * expiryDays);
		cookie.setPath(path);
		if (currentDomain.equals(LOCALHOST)) {
			cookie.setDomain(LOCALHOST);
		} else {
			cookie.setDomain(domainProperties.getServiceDomain());
		}
		res.addCookie(cookie);
	}

	/**
	 * 쿠키를 삭제합니다.
	 * <p>
	 * 해당 쿠키의 만료시간을 0으로 설정하는 방식으로 삭제합니다.
	 *
	 * @param res  요청 시의 서블렛 {@link HttpServletResponse}
	 * @param name 쿠키 이름
	 */
	public void deleteCookie(HttpServletResponse res, String name) {
		Cookie cookie = new Cookie(name, null);
		cookie.setMaxAge(0);
		res.addCookie(cookie);
	}

	public Cookie cookieOf(String name, String value) {
		return new Cookie(name, value);
	}
}
