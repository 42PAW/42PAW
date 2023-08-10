import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

export interface SignUpInfoDTO {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  categoryFilters: AnimalSpecies[];
}

export interface UserInfoDTO {
  memberName: string;
  intraName: string;
  profileImageUrl: string;
  language: string;
}
