import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import { followType } from "../enum/followType.enum";
import { ReportReason } from "../enum/report.enum";
import { Country } from "@/types/enum/country.enum";

export interface SignUpInfoDTO {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  categoryFilters: AnimalSpecies[];
}

export interface MemberProfileChangeRequestDto {
  memberName: string | null;
  imageData: Blob | null;
  statement: string;
  profileImageChanged: string | null;
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
  profileImageUrl: string | null;
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
  country: Country;
  statement: string;
  relationship: followType;
}

export interface FollowerDTO {
  memberId: number;
  memberName: string;
  intraName: string;
  profileImageUrl: string;
  country: Country;
  statement: string;
  relationship: followType;
}

export interface MemberPreviewResponseDto {
  // 나중에 위의 두개 합칠 수 있을듯
  memberId: number;
  memberName: string;
  intraName: string;
  profileImageUrl: string;
  country: Country;
  statement: string;
  relationship: followType;
}
