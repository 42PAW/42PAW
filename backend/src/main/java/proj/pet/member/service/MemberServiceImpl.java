package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	@Override public void uploadMemberProfileImage(Long memberId, MultipartFile profileImageData) {

	}

	@Override public void changeMemberProfileImage(Long memberId, MultipartFile profileImageData) {

	}
}
