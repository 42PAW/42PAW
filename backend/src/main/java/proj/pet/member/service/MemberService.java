package proj.pet.member.service;

import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
	void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData);
	void changeMemberProfileImage(Long memberId, MultipartFile profileImageData);
}
