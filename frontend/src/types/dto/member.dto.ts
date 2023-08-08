import { AnimalSpecies } from "../enum/animal.filter.enum";

export interface SignUpInfoDTO {
  memberName: string;
  imageData: Blob | null;
  statement: string;
  categoryFilters: AnimalSpecies[];
}
