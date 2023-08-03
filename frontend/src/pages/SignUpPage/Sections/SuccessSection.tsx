import { styled } from "styled-components";
import { SectionProps } from "../SignUpPage";
import createConfetti from "canvas-confetti";

const SuccessSection: React.FC<SectionProps> = ({ registerData }) => {
  createConfetti({
    particleCount: 200,
    spread: 150,
    origin: { x: 0.5, y: 0.5 },
  });

  return (
    <WrapperStyled>
      <h1>
        환영합니다! <br /> {registerData.Nickname}
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
