import { useState, useEffect } from "react";
import { styled, keyframes } from "styled-components";
import { SectionProps } from "@/pages/SignUpPage/SignUpPage";
import { Section } from "@/pages/SignUpPage/SignUpPage";
import useToaster from "@/hooks/useToaster";
import useDebounce from "@/hooks/useDebounce";
import useNicknameValidation from "@/hooks/useNicknameValidation";

const NicknameSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(true);
  const { nicknameValidation } = useNicknameValidation();
  const { debounce } = useDebounce();
  const { popToast } = useToaster();

  const submitNickname = async () => {
    if (isWrong === true) {
      popToast("잠시 후에 다시 시도해주세요.", "N");
      return;
    }
    const isValid = await nicknameValidation(registerData.memberName);
    if (!isValid) {
      setIsWrong(true);
      debounce("nickname", () => setIsWrong(false), 2000);
      return;
    }
    setIsFading(true);
    setTimeout(() => {
      setStep(Section.ProfileImage);
    }, 200);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, memberName: e.target.value });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submitNickname();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFading(false);
    }, 200);
  }, []);

  return (
    <WrapperStyled $isFading={isFading}>
      <h1>당신의 닉네임은 무엇인가요?</h1>
      <InputContainer $isWrong={isWrong}>
        <input
          placeholder="최대 10자 이내"
          value={registerData.memberName}
          onChange={handleOnChange}
          minLength={3}
          maxLength={10}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={submitNickname}>
          <img src="/assets/arrowW.png" />
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
    font-size: 2.5rem;
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
