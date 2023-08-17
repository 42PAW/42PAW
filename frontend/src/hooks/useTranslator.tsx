import Translator from "@/languages/Translator";
import { Language } from "@/types/enum/language.enum";
import { languageState } from "@/recoil/atom";
import { useSetRecoilState } from "recoil";

const useTranslator = () => {
  const setLanguage = useSetRecoilState(languageState);

  const translator = (language: Language) => {
    let translatedLanguage = null;

    if (language === Language.KOREAN) {
      translatedLanguage = Translator.ko;
    } else if (language === Language.ENGLISH) {
      translatedLanguage = Translator.en;
    } else if (language === Language.JAPANESE) {
      translatedLanguage = Translator.jp;
    } else if (language === Language.SPANISH) {
      translatedLanguage = Translator.spa;
    } else if (language === Language.FRENCH) {
      translatedLanguage = Translator.fr;
    } else if (language === Language.GERMAN) {
      translatedLanguage = Translator.ger;
    } else if (language === Language.ITALIAN) {
      translatedLanguage = Translator.it;
    } else if (language === Language.PORTUGUESE) {
      translatedLanguage = Translator.pt;
    }
    if (translatedLanguage) {
      setLanguage(translatedLanguage);
    }
  };
  return {
    translator,
  };
};

export default useTranslator;
