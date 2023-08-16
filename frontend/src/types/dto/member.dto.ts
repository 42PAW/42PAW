import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

export interface SignUpInfoDTO {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  categoryFilters: AnimalSpecies[];
}

export interface UserInfoDTO {
  memberId: number;
  memberName: string;
  intraName: string;
  profileImageUrl: string;
  language: string;
}

export interface ProfileInfoDTO {
  memberName: string;
  intraName: string;
  nicknameUpdatedAt: Date;
  profileImageUrl: string;
  country: string;
  statement: string;
  followingCount: number;
  followerCount: number;
  boardCount: number;
  followType: string;
}
