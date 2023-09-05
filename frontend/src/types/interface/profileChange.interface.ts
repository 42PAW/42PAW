/**
 * @memberName 유저 이름
 * @imageData 프로필 이미지
 * @statement 한 줄 소개
 * @nameChanged 팔로잉 수
 * @profileImageChanged  이미지 변경여부
 * @statementChanged 게시글 수
 */
export interface IChangeProfileInfo {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  nameChanged: boolean;
  profileImageChanged: boolean;
  statementChanged: boolean;
}
