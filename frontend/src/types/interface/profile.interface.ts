/**
 * @memberName 유저 이름
 * @intraName  유저 42 인트라 아이디
 * @nicknameUpdatedAt 유저 이름 갱신 날짜
 * @profileImageUrl 프로필 이미지
 * @country 국적
 * @statement 한 줄 소개
 * @followingCount 팔로잉 수
 * @followerCount  팔로워 수
 * @boardCount 게시글 수
 */
export interface IprofileInfo {
  memberName: string;
  intraName: string;
  nicknameUpdatedAt: string;
  profileImageUrl: string;
  country: string;
  statement: string;
  followingCount: number;
  followerCount: number;
  boardCount: number;
}

/**
 * @memberName 유저 이름
 * @imageData 프로필 이미지
 * @statement 한 줄 소개
 * @nicknameUpdatedAt 유저 이름 갱신 날짜
 */
export interface IchangeProfileInfo {
  memberName: string;
  imageData: string;
  statement: string;
  nicknameUpdatedAt: string;
}
