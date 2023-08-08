import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

export interface SignUpInfoDTO {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  categoryFilters: AnimalSpecies[];
}
