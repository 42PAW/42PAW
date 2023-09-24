import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import createConfetti from "canvas-confetti";
import { SectionProps } from "@/pages/SignUpPage/SignUpPage";
import { useEffect } from "react";
import { axiosSignUp } from "@/api/axios/axios.custom";
import { languageState } from "@/recoil/atom";
import { useRecoilState } from "recoil";

const SuccessSection: React.FC<SectionProps> = ({ registerData }) => {
  const [language] = useRecoilState<any>(languageState);
  const navigator = useNavigate();

  createConfetti({
    particleCount: 200,
    spread: 150,
    origin: { x: 0.5, y: 0.5 },
  });

  useEffect(() => {
    const signUpComplete = async () => {
      axiosSignUp(registerData);
      setTimeout(() => {
        navigator("/");
      }, 2000);
    };
    signUpComplete();
  }, []);

  return (
    <WrapperStyled>
      <h1>
        {language.welcome} <br /> {registerData.memberName}
      </h1>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;

  h1 {
    margin-top: -400px;
    font-size: 2.5rem;
    text-align: center;
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

export default SuccessSection;
