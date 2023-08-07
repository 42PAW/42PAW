import { styled } from "styled-components";
import { SectionProps } from "../SignUpPage";
import { Section } from "../SignUpPage";
import RevertButton from "../components/RevertButton";

const IntroductionSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, Introduction: e.target.value });
  };

  const handleOnClick = () => {
    setStep(Section.AnimalFilter);
  };

  return (
    <WrapperStyled>
      <h1>
        자신을 표현할 수 있는 <br /> 소개를 적어 주세요
      </h1>
      <RevertButton setStep={setStep} to={Section.ProfileImage} />
      <InputContainer>
        <input
          placeholder="최대 30자 이내"
          value={registerData.Introduction}
          onChange={handleOnChange}
          maxLength={40}
        ></input>
        <button onClick={handleOnClick}>
          <img src="/src/assets/arrowW.png" />
        </button>
      </InputContainer>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  h1 {
    margin-top: -470px;
    font-size: 3rem;
    text-align: center;
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
