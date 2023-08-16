import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import createConfetti from "canvas-confetti";
import { SectionProps } from "@/pages/SignUpPage/SignUpPage";
import { useEffect } from "react";
import { axiosSignUp } from "@/api/axios/axios.custom";

const SuccessSection: React.FC<SectionProps> = ({ registerData }) => {
  const navigator = useNavigate();

  createConfetti({
    particleCount: 200,
    spread: 150,
    origin: { x: 0.5, y: 0.5 },
  });

  const signUpComplete = async () => {
    await axiosSignUp(registerData);
    setTimeout(() => {
      navigator("/");
    }, 2000);
  };

  useEffect(() => {
    signUpComplete();
  }, []);

  return (
    <WrapperStyled>
      <h1>
        환영합니다! <br /> {registerData.memberName}
      </h1>
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
    margin-top: -400px;
    font-size: 3rem;
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
