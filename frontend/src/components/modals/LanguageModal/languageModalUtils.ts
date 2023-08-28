import { Language } from "@/types/enum/language.enum";
import Translator from "@/languages/Translator";

//v1에서 지원하고 있는 언어 목록
export const languages: Language[] = [
  Language.KOREAN,
  Language.ENGLISH,
  Language.JAPANESE,
  Language.SPANISH,
  Language.FRENCH,
  Language.GERMAN,
  Language.ITALIAN,
  Language.PORTUGUESE,
];

//실제 클라이언트 화면에 렌더링될 언어 + 국기
export const renderLanguage = {
  [Language.KOREAN]: "🇰🇷 한국어",
  [Language.ENGLISH]: "🇬🇧 English",
  [Language.JAPANESE]: "🇯🇵 日本語",
  [Language.SPANISH]: "🇪🇸 español",
  [Language.FRENCH]: "🇫🇷 français",
  [Language.GERMAN]: "🇩🇪 Deutsch",
  [Language.ITALIAN]: "🇮🇹 italiano",
  [Language.PORTUGUESE]: "🇵🇹 Português",
};

//language(recoil state)를 실제 변경해 줄 딕셔너리
export const languageTranslator = {
  [Language.KOREAN]: Translator.ko,
  [Language.ENGLISH]: Translator.en,
  [Language.JAPANESE]: Translator.jp,
  [Language.SPANISH]: Translator.spa,
  [Language.FRENCH]: Translator.fr,
  [Language.GERMAN]: Translator.ger,
  [Language.ITALIAN]: Translator.it,
  [Language.PORTUGUESE]: Translator.pt,
};
