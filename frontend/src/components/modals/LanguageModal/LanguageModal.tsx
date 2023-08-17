import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { Language } from "@/types/enum/language.enum";
import { languageState } from "@/recoil/atom";
import Translator from "@/languages/Translator";
import useModal from "@/hooks/useModal";
import useToaster from "@/hooks/useToaster";
import { axiosChangeLanguage } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";

const token = getCookie("access_token");

const LanguageModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [language, setLanguage] = useRecoilState<any>(languageState);
  const { closeModal } = useModal();
  const { popToast } = useToaster();
  const languages: Language[] = [
    Language.KOREAN,
    Language.ENGLISH,
    Language.JAPANESE,
    Language.SPANISH,
    Language.FRENCH,
    Language.GERMAN,
    Language.ITALIAN,
    Language.PORTUGUESE,
  ];

  const renderLanguage = (renderLanguage: Language) => {
    if (renderLanguage === Language.KOREAN) return "🇰🇷 한국어";
    if (renderLanguage === Language.ENGLISH) return "🇬🇧 English";
    if (renderLanguage === Language.JAPANESE) return "🇯🇵 日本語";
    if (renderLanguage === Language.SPANISH) return "🇪🇸 español";
    if (renderLanguage === Language.FRENCH) return "🇫🇷 français";
    if (renderLanguage === Language.GERMAN) return "🇩🇪 Deutsch";
    if (renderLanguage === Language.ITALIAN) return "🇮🇹 italiano";
    if (renderLanguage === Language.PORTUGUESE) return "🇵🇹 Português";
  };

  const handleLanguageSetting = (currentLanguage: Language) => {
    let translatedLanguage = null;

    if (currentLanguage === Language.KOREAN) {
      translatedLanguage = Translator.ko;
    } else if (currentLanguage === Language.ENGLISH) {
      translatedLanguage = Translator.en;
    } else if (currentLanguage === Language.JAPANESE) {
      translatedLanguage = Translator.jp;
    } else if (currentLanguage === Language.SPANISH) {
      translatedLanguage = Translator.spa;
    } else if (currentLanguage === Language.FRENCH) {
      translatedLanguage = Translator.fr;
    } else if (currentLanguage === Language.GERMAN) {
      translatedLanguage = Translator.ger;
    } else if (currentLanguage === Language.ITALIAN) {
      translatedLanguage = Translator.it;
    } else if (currentLanguage === Language.PORTUGUESE) {
      translatedLanguage = Translator.pt;
    }
    if (translatedLanguage) {
      setLanguage(translatedLanguage);
      if (token) axiosChangeLanguage(currentLanguage);
      popToast(translatedLanguage.languageChangedToast, "P");
    }
    closeModal(ModalType.LANGUAGE);
  };

  return (
    <ModalLayout
      modalName={ModalType.LANGUAGE}
      isOpen={currentOpenModal.languageModal}
    >
      <WrapperStyled>
        <HeaderStyled>{language.languageSetting}</HeaderStyled>

        <LanguageItemContainerStyled>
          {languages.map((language) => (
            <LanguageItemStyled
              key={language}
              onClick={() => handleLanguageSetting(language)}
            >
              {renderLanguage(language)}
            </LanguageItemStyled>
          ))}
        </LanguageItemContainerStyled>
      </WrapperStyled>
    </ModalLayout>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px;
  padding-bottom: 20px;
  border-radius: 15px;
  background-color: var(--white);
`;

const HeaderStyled = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 5px;
  background-color: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: var(--white);
  color: var(--grey);
  font-size: 1.4rem;
`;

const LanguageItemContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 100px);
  grid-auto-rows: 30px;
  grid-row-gap: 10px;
  padding: 0px 10px;
`;

const LanguageItemStyled = styled.button`
  height: 30px;
  border-radius: 5px;
  border: none;
  font-size: 1.2rem;
  background-color: var(--white);

  &:hover {
    background-color: var(--lightpurple);
    transition: background-color 0.5s ease;
  }
`;

export default LanguageModal;
