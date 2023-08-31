import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { SectionProps } from "@/pages/SignUpPage/SignUpPage";
import { Section } from "@/pages/SignUpPage/SignUpPage";
import RevertButton from "@/pages/SignUpPage/components/RevertButton";

const ProfileImageSection: React.FC<SectionProps> = ({ setStep }) => {
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
      <h1>사진을 선택해주세요</h1>
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
  height: 100vh;
  width: 100vw;
  opacity: ${({ $isFading }) => ($isFading ? 0 : 1)};
  transition: opacity 0.2s ease;
  h1 {
    margin-top: -100px;
    font-size: 3rem;
  }
`;

const NextButtonStyled = styled.button`
  height: 45px;
  width: 45px;
  padding: 0;
  margin-left: 10px;
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

export default ProfileImageSection;
