import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { Section } from "@/pages/SignUpPage/SignUpPage";
import RevertButton from "@/pages/SignUpPage/components/RevertButton";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

interface SectionProps {
  setStep: React.Dispatch<React.SetStateAction<Section>>;
  isLoading: boolean; // isLoading 추가
}

const ProfileImageSection: React.FC<SectionProps> = ({
  setStep,
  isLoading,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const [isFading, setIsFading] = useState<boolean>(true);

  const handleOnClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setStep(Section.Introduction);
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
        to={Section.Nickname}
        setIsFading={setIsFading}
      />
      <h1>{language.selectAPhoto}</h1>
      <NextButtonStyled onClick={handleOnClick} disabled={isLoading}>
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
    margin-top: -100px;
    font-size: 2.5rem;
  }
`;

const NextButtonStyled = styled.button`
  height: 45px;
  width: 45px;
  padding: 0;
  margin-left: 10px;
  border: none;
  background-color: transparent;
  &:disabled {
    pointer-events: none;
  }
  img {
    width: 100%;
    opacity: 0.5;
    &:hover {
      opacity: 0.8;
      transition: opacity 0.5s ease;
    }
  }
`;

export default ProfileImageSection;
