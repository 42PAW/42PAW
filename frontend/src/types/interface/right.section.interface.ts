/**
 * 오른쪽 섹션에 어떤 섹션이 렌더링해야 할지 판단하기 위한 boolean 속성을 담는 인터페이스
 * @search 검색 섹션
 * @comment 댓글 섹션
 * @follower 팔로워 목록 세션
 * @following 팔로잉 목록 세션
 * @animalFilter 동물 필터 섹션
 * @bannedMember 밴 유저 섹션
 */
export interface IRightSectionContentInfo {
  search: boolean;
  comment: boolean;
  follower: boolean;
  following: boolean;
  animalFilter: boolean;
  bannedMember: boolean;
  notification: boolean;
}
