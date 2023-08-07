import { styled, keyframes } from "styled-components";
import { SectionProps } from "../SignUpPage";
import { Section } from "../SignUpPage";
import useToaster from "../../../hooks/useToaster";
import { useState, useEffect, useRef } from "react";

const NicknameSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, Nickname: e.target.value });
  };
  const [isWrong, setIsWrong] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { popToast } = useToaster();

  const handleOnClick = () => {
    if (isWrong === true) {
      popToast("잠시 후에 다시 시도해주세요.", "N");
      return;
    }
    if (
      registerData.Nickname === "중복됨" ||
      registerData.Nickname.length < 3
    ) {
      if (registerData.Nickname.length < 3) {
        popToast("닉네임은 3글자 이상이어야 합니다.", "N");
      } else if (registerData.Nickname === "중복됨") {
        popToast("사용 중인 닉네임입니다.", "N");
      }
      setIsWrong(true);
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = setTimeout(() => {
        setIsWrong(false);
      }, 1000);
      return;
    }
    setStep(Section.ProfileImage);
  };

  return (
    <WrapperStyled>
      <h1>당신의 닉네임은 무엇인가요?</h1>
      <InputContainer $isWrong={isWrong}>
        <input
          placeholder="최대 10자 이내"
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

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

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

const InputContainer = styled.div<{ $isWrong: boolean }>`
  display: flex;
  align-items: center;

  input {
    height: 45px;
    width: 250px;
    outline: none;
    font-size: 2rem;
    border-radius: 15px;
    border: none;
    padding: 0px 16px;
    background-color: var(--transparent);
    color: var(--white);
    animation: ${({ $isWrong }) => ($isWrong ? shakeAnimation : "none")} 0.5s;
  }
  input::placeholder {
    color: var(--transparent);
    font-size: 1.6rem;
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
