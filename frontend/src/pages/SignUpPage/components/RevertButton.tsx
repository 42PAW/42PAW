import { styled } from "styled-components";
import { Section } from "../SignUpPage";

interface RevertButtonProps {
  setStep: React.Dispatch<React.SetStateAction<Section>>;
  to: Section;
}

const RevertButton = ({ setStep, to }: RevertButtonProps) => {
  const handleRevert = () => {
    setStep(to);
  };

  return (
    <RevertButtonStyled onClick={handleRevert}>
      <img src="/src/assets/backArrow.png" />
    </RevertButtonStyled>
  );
};

const RevertButtonStyled = styled.button`
  position: absolute;
  left: 0%;
  top: 0%;
  border: none;
  height: 40px;
  width: 40px;
  background-color: transparent;
  img {
    width: 100%;
    opacity: 0.6;
  }
  img:hover {
    opacity: 0.8;
    transition: opacity 0.5s ease;
  }
`;

export default RevertButton;
