import { styled } from "styled-components";
import { SectionProps } from "../SignUpPage";
import { Section } from "../SignUpPage";
import AnimalButtonContainer from "../../../components/AnimalButtonContainer";
import RevertButton from "../components/RevertButton";

const AnimalFilterSection: React.FC<SectionProps> = ({
  registerData,
  setRegisterData,
  setStep,
}) => {
  const handleOnClick = () => {
    setStep(Section.Success);
  };

  return (
    <WrapperStyled>
      <RevertButton setStep={setStep} to={Section.Introduction} />
      <h1>
        "만나고 싶은 동물 친구들을 <br /> 선택해 주세요"
      </h1>
      <ButtonZoneStyled>
        <AnimalButtonContainer columns={2} />
      </ButtonZoneStyled>
      <NextButtonStyled onClick={handleOnClick}>
        <img src="/src/assets/arrowW.png" />
      </NextButtonStyled>
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
    text-align: center;
  }
`;

const ButtonZoneStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NextButtonStyled = styled.button`
  z-index: 2;
  height: 45px;
  width: 45px;
  padding: 0;
  margin-left: 10px;
  margin-top: 20px;
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
`;

export default AnimalFilterSection;
