package proj.pet.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.pet.member.dto.*;

@Service
@RequiredArgsConstructor
public class MemberFacadeServiceImpl implements MemberFacadeService {

	@Override
	public MemberCreateResponse createMember(MemberCreateRequest memberCreateRequest) {
		return null;
	}

	@Override
	public MemberProfileChangeResponse changeMemberProfile(MemberProfileChangeRequest memberProfileChangeRequest) {
		return null;
	}

	@Override
	public MemberPreviewResponse getMemberPreview(Long memberId) {
		return null;
	}

	@Override
	public MemberNicknameValidateResponse validateMemberNickname(String nickname) {
		return null;
	}

	@Override
	public MemberBoardsResponse getMyBoards(UserSession userSession) {
		return null;
	}

	@Override
	public MemberBoardsResponse getMemberBoards(Long memberId) {
		return null;
	}

	@Override
	public MemberSearchResponse searchMemberByNickname(String nickname) {
		return null;
	}
}
