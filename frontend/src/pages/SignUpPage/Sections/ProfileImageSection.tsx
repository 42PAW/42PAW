import { styled } from "styled-components";
import { SectionProps } from "../SignUpPage";
import { Section } from "../SignUpPage";
import RevertButton from "../components/RevertButton";

const ProfileImageSection: React.FC<SectionProps> = ({ setStep }) => {
  const handleOnClick = () => {
    setStep(Section.Introduction);
  };

  return (
    <WrapperStyled>
      <RevertButton setStep={setStep} to={Section.Nickname} />
      <h1>사진을 선택해주세요</h1>
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
    margin-top: -100px;
    font-size: 3rem;
  }
`;

const NextButtonStyled = styled.button`
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
`;

export default ProfileImageSection;
