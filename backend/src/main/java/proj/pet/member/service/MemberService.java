package proj.pet.member.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import proj.pet.auth.domain.jwt.JwtPayload;
import proj.pet.category.domain.Species;
import proj.pet.member.domain.Language;
import proj.pet.member.domain.Member;
import proj.pet.member.dto.MemberProfileChangeResponseDto;
import proj.pet.member.dto.UserSessionDto;

public interface MemberService {

	Member createMember(JwtPayload payload, String nickname, String statement,
			List<Species> categoryFilters, LocalDateTime now);

	void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData);

	MemberProfileChangeResponseDto changeMemberProfile(UserSessionDto userSessionDto,
			String memberName, String profileImageUrl, String statement,
			boolean profileImageChanged);

	void changeLanguage(Long memberId, Language language);
}
