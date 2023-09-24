import { CountryEmoji } from "@/types/enum/country.enum";
import { Country } from "@/types/enum/country.enum";

export const useCountryEmoji = (countryKey: Country) => {
  const countryFlag = CountryEmoji[countryKey];
  return countryFlag;
};
