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
  width: 550px;
  height: 100%;
  min-width: 0px;
  background-color: #fdfdfd39;
  border-radius: 30px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
  margin-left: 20px;
  margin-right: ${(props) => (props.isRightSectionOpened ? "0px" : "-570px")};
  opacity: ${(props) => (props.isRightSectionOpened ? 1 : 0)};
  transition: opacity 1s ease-in-out, margin-right 1s ease-in-out;
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
    width: 20px;
  }
`;

export default RightSection;
