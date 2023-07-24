package proj.pet.member.service;

import proj.pet.member.dto.*;

public interface MemberFacadeService {
	MemberPreviewResponse getMemberPreview(Long memberId);
	MemberCreateResponse createMember(MemberCreateRequest memberCreateRequest);
	MemberProfileChangeResponse changeMemberProfile(MemberProfileChangeRequest memberProfileChangeRequest);
	MemberNicknameValidateResponse validateMemberNickname(String nickname);
	MemberBoardsResponse getMyBoards(UserSession userSession);
	MemberBoardsResponse getMemberBoards(Long memberId);
	MemberSearchResponse searchMemberByNickname(String nickname);
}
