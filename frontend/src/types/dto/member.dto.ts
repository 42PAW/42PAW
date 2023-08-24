import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import { followType } from "../enum/followType.enum";
import { ReportReason } from "../enum/report.enum";

export interface SignUpInfoDTO {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  categoryFilters: AnimalSpecies[];
}

export interface ReportDTO {
  reportedMemberId: number | null;
  boardId: number | null;
  commentId: number | null;
  reason: ReportReason | null;
  content: string;
}

export interface UserInfoDTO {
  memberId: number;
  memberName: string;
  intraName: string;
  profileImageUrl: string;
  language: string;
  animalCategories: AnimalSpecies[];
}

export interface ProfileInfoDTO {
  memberName: string;
  intraName: string;
  nicknameUpdatedAt: Date;
  profileImageUrl: string;
  country: string;
  campus: string;
  statement: string;
  followingCount: number;
  followerCount: number;
  boardCount: number;
  followType: followType;
}

export interface MemberSearchResponseDTO {
  memberId: number;
  memberName: string;
  intraName: string;
  profileImageUrl: string;
  country: string;
  statement: string;
  relationship: string;
}
