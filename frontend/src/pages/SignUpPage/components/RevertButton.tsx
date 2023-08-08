import { styled } from "styled-components";
import { Section } from "../SignUpPage";

interface RevertButtonProps {
  setStep: React.Dispatch<React.SetStateAction<Section>>;
  to: Section;
  setIsFading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RevertButton = ({ setStep, to, setIsFading }: RevertButtonProps) => {
  const handleRevert = () => {
    setIsFading(true);
    setTimeout(() => {
      setStep(to);
    }, 200);
  };

  return (
    <RevertButtonStyled onClick={handleRevert}>
      <img src="/src/assets/arrow.png" />
    </RevertButtonStyled>
  );
};

const RevertButtonStyled = styled.button`
  position: absolute;
  left: 10px;
  top: 10px;
  border: none;
  padding: 0;
  height: 25px;
  width: 25px;
  background-color: transparent;
  transform: scaleX(-1);
  img {
    width: 100%;
    opacity: 0.5;
  }
  img:hover {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
`;

export default RevertButton;
