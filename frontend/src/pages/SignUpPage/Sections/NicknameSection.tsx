import { styled } from "styled-components";
import { SectionProps } from "../SignUpPage";
import { Section } from "../SignUpPage";

const NicknameSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, Nickname: e.target.value });
  };

  const handleOnClick = () => {
    setStep(Section.ProfileImage);
  };

  return (
    <WrapperStyled>
      <h1>당신의 닉네임은 무엇인가요?</h1>
      <InputContainer>
        <input
          value={registerData.Nickname}
          onChange={handleOnChange}
          minLength={3}
          maxLength={10}
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
    font-size: 3rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    height: 45px;
    width: 250px;
    outline: none;
    font-size: 2rem;
    border-radius: 15px;
    border: none;
    padding: 0px 10px;
    background-color: var(--transparent);
    color: var(--white);
  }
  button {
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
  }
`;

export default NicknameSection;
