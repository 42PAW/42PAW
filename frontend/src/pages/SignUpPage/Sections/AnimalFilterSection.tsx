import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { SectionProps } from "@/pages/SignUpPage/SignUpPage";
import { Section } from "@/pages/SignUpPage/SignUpPage";
import AnimalButtonContainer from "@/components/AnimalButtonContainer";
import RevertButton from "@/pages/SignUpPage/components/RevertButton";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";
import useToaster from "@/hooks/useToaster";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

const AnimalFilterSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const [isFading, setIsFading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<AnimalSpecies[]>([]);
  const { popToast } = useToaster();

  const handleOnClick = () => {
    if (categoryList.length === 0) {
      const selectCategoryMsg = language.SelectCategory;
      popToast(selectCategoryMsg, "N");
      return;
    }
    setRegisterData({ ...registerData, categoryFilters: [...categoryList] });
    setIsFading(true);
    setTimeout(() => {
      setStep(Section.Success);
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFading(false);
    }, 200);
  }, []);

  return (
    <WrapperStyled $isFading={isFading}>
      <RevertButton
        setStep={setStep}
        to={Section.Introduction}
        setIsFading={setIsFading}
      />
      <h1>
        {language.selectAnimalCategory}
        {/* TODO: put an apprioriate newline */}
      </h1>
      <ButtonZoneStyled>
        <AnimalButtonContainer
          columns={2}
          buttonRow={50}
          buttonFontSize={150}
          setter={setCategoryList}
        />
      </ButtonZoneStyled>
      <NextButtonStyled onClick={handleOnClick}>
        <img src="/assets/arrowW.png" />
      </NextButtonStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{ $isFading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  opacity: ${({ $isFading }) => ($isFading ? 0 : 1)};
  transition: opacity 0.2s ease;
  h1 {
    font-size: 3rem;
    text-align: center;
  }
`;

const ButtonZoneStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NextButtonStyled = styled.button`
  z-index: 2;
  height: 45px;
  width: 45px;
  padding: 0;
  margin-left: 10px;
  margin-top: 20px;
  border: none;
  background-color: transparent;
  img {
    width: 100%;
    opacity: 0.5;
  }
  img:hover {
    opacity: 0.8;
    transition: opacity 0.5s ease;
  }
`;

export default AnimalFilterSection;
