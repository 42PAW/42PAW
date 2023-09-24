import { followType } from "@/types/enum/followType.enum";

/**
 * @memberId 차단할 유저 id
 * @userName 차단할 유저 닉네임
 */
export interface IBanUserInfo {
  memberId: number | null;
  userName: string;
  followType: followType | null;
  callback?: () => void;
}

/**
 * @userName 유저 닉네임
 * @profileImage 유저 프로필 이미지
 */
export interface IUserProfileCardInfo {
  userName: string;
  profileImage: string;
}
