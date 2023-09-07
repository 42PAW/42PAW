import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import ModalLayout from "@/components/modals/ModalLayout";
import { ModalType } from "@/types/enum/modal.enum";
import { currentOpenModalState } from "@/recoil/atom";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { Language } from "@/types/enum/language.enum";
import { languageState } from "@/recoil/atom";
import useModal from "@/hooks/useModal";
import useToaster from "@/hooks/useToaster";
import { axiosChangeLanguage } from "@/api/axios/axios.custom";
import { getCookie } from "@/api/cookie/cookies";
import {
  languages,
  renderLanguage,
  languageTranslator,
} from "./languageModalUtils";

const token = getCookie("access_token");

const LanguageModal = () => {
  const [currentOpenModal] = useRecoilState<ICurrentModalStateInfo>(
    currentOpenModalState
  );
  const [language, setLanguage] = useRecoilState<any>(languageState);
  const { closeModal } = useModal();
  const { popToast } = useToaster();

  const updateLanguageSetting = (currentLanguage: Language) => {
    const translatedLanguage = languageTranslator[currentLanguage];

    if (translatedLanguage) {
      setLanguage(translatedLanguage);
      //로그인 상태 -> 실제 서버 api 요청 후 유저 언어 설정 변경
      if (token) axiosChangeLanguage(currentLanguage);
      // 로그아웃 상태 -> 로컬 스토리지에 비로그인 상태 언어 설정 업데이트
      if (!token) localStorage.setItem("language", currentLanguage);
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
              onClick={() => updateLanguageSetting(language)}
            >
              {renderLanguage[language]}
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
  border-radius: 10px;
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
  font-weight: 500;
`;

const LanguageItemContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 30px;
  grid-row-gap: 10px;
  padding: 0px 10px;
`;

const LanguageItemStyled = styled.button`
  height: 30px;
  padding: 0px 10px;
  border-radius: 5px;
  border: none;
  font-size: 1.2rem;
  background-color: var(--white);
  color: black;
  &:hover {
    background-color: var(--lightpurple);
    transition: background-color 0.5s ease;
  }
`;

export default LanguageModal;
