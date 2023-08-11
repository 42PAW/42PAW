package proj.pet.member.service;

import org.springframework.web.multipart.MultipartFile;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Member;

import java.time.LocalDateTime;
import java.util.List;

public interface MemberService {
	void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData);

	void changeMemberProfileImage(Long memberId, MultipartFile profileImageData);

	Member createMember(JwtPayload payload, String nickname, String statement, List<Species> categoryFilters, LocalDateTime now);


}
