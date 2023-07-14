import styled from "styled-components";
import { isRightSectionOpenedState } from "../recoil/atom";
import { useRecoilState } from "recoil";

const RightSection = () => {
  const [isRightSectionOpened, setIsRightSectionOpened] =
    useRecoilState<boolean>(isRightSectionOpenedState);

  const handleRightSection = () => {
    setIsRightSectionOpened(!isRightSectionOpened);
  };

  return (
    <>
      <RightSectionStyled isRightSectionOpened={isRightSectionOpened}>
        <CloseButtonContainerStyled>
          <CloseButtonStyled onClick={handleRightSection}>
            <img src="/src/assets/exitW.png" />
          </CloseButtonStyled>
        </CloseButtonContainerStyled>
      </RightSectionStyled>
    </>
  );
};

const RightSectionStyled = styled.div<{
  isRightSectionOpened: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 90%;
  background-color: #fdfdfd39;
  margin-left: 50px;
  border-radius: 30px;
  transition: opacity 1s ease-in-out;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
  opacity: ${(props) => (props.isRightSectionOpened ? 1 : 0)};
  min-width: 165px;
`;

const CloseButtonContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 5%;
`;

const CloseButtonStyled = styled.button`
  height: 100%;
  width: 8%;
  background-color: transparent;
  border: none;
  margin-right: 1%;
  img {
    width: 50%;
  }
`;

export default RightSection;
