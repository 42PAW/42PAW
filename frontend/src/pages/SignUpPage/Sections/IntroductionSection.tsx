import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { SectionProps } from "@/pages/SignUpPage/SignUpPage";
import { Section } from "@/pages/SignUpPage/SignUpPage";
import RevertButton from "@/pages/SignUpPage/components/RevertButton";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

const IntroductionSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const [language] = useRecoilState<any>(languageState);
  const [isFading, setIsFading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFading(false);
    }, 200);
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, statement: e.target.value });
  };

  const submitStatement = () => {
    setIsFading(true);
    setTimeout(() => {
      setStep(Section.AnimalFilter);
    }, 200);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submitStatement();
  };

  return (
    <WrapperStyled $isFading={isFading}>
      <h1>
        {language.writeIntroduction}
        {/* TODO: put an apprioriate newline */}
      </h1>
      <RevertButton
        setStep={setStep}
        to={Section.ProfileImage}
        setIsFading={setIsFading}
      />
      <InputContainer>
        <input
          placeholder={language.upTo50Characters} // 국가에 따라 언어 변경
          value={registerData.statement}
          onChange={handleOnChange}
          maxLength={50}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={submitStatement}>
          <img src="/assets/arrowW.png" />
        </button>
      </InputContainer>
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
    margin-top: -470px;
    font-size: 2.5rem;
    text-align: center;
    @media (max-width: 767px) {
      font-size: 2rem;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    height: 45px;
    width: 250px;

    margin-right: 10px;
    outline: none;
    font-size: 2rem;
    border-radius: 15px;
    border: none;
    padding: 0px 16px;
    background-color: var(--transparent);
    color: var(--white);
  }
  input::placeholder {
    color: var(--transparent);
    font-size: 1.6rem;
  }
  button {
    height: 45px;
    width: 45px;
    padding: 0;
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
  }
`;

export default IntroductionSection;
