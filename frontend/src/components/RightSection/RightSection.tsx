import styled, { keyframes } from "styled-components";
import {
  isRightSectionOpenedState,
  rightSectionContentState,
} from "@/recoil/atom";
import { useRecoilState } from "recoil";
import CommentSection from "@/components/RightSection/CommentSection/CommentSection";
import SearchSection from "@/components/RightSection/SearchSection/SearchSection";
import AnimalFilterSection from "@/components/RightSection/AnimalFilterSection/AnimalFilterSection";
import useRightSectionHandler from "@/hooks/useRightSectionHandler";
import { IRightSectionContentInfo } from "@/types/interface/right.section.interface";

const RightSection = () => {
  const [isRightSectionOpened] = useRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const [rightSectionContent] = useRecoilState<IRightSectionContentInfo>(
    rightSectionContentState
  );
  const { closeRightSection } = useRightSectionHandler();

  return (
    <>
      <RightSectionStyled $isRightSectionOpened={isRightSectionOpened}>
        <CloseButtonContainerStyled>
          <CloseButtonStyled onClick={closeRightSection}>
            <img src="/src/assets/exitW.png" />
          </CloseButtonStyled>
        </CloseButtonContainerStyled>
        <RightSectionBodyStyled>
          {rightSectionContent.comment && <CommentSection />}
          {rightSectionContent.search && <SearchSection />}
          {rightSectionContent.animalFilter && <AnimalFilterSection />}
        </RightSectionBodyStyled>
      </RightSectionStyled>
      {isRightSectionOpened && <OverlayStyled onClick={closeRightSection} />}
    </>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const OverlayStyled = styled.div`
  z-index: 3;
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.2s;
  backdrop-filter: blur(5px);
  @media (max-width: 1023px) {
    display: flex;
  }
`;

const RightSectionStyled = styled.div<{
  $isRightSectionOpened: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 490px;
  height: 100%;
  max-height: 860px;

  margin-left: 20px;
  border-radius: 30px;
  background-color: var(--transparent);
  box-shadow: var(--default-shadow);
  margin-right: ${(props) => (props.$isRightSectionOpened ? "0px" : "-480px")};
  opacity: ${(props) => (props.$isRightSectionOpened ? 1 : 0)};
  transition: opacity 0.5s ease-in-out, margin-right 0.5s ease-in-out;
  @media (max-width: 1023px) {
    z-index: 4;
    background-color: #dbdcfec3;
    opacity: 1;
    position: absolute;
    bottom: ${(props) => (props.$isRightSectionOpened ? "0%" : "-100%")};
    margin-right: 0;
    transition: bottom 0.5s ease;
    height: 85%;
    width: 100%;
    margin-left: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const CloseButtonContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--transparent);
`;

const CloseButtonStyled = styled.button`
  height: 100%;
  width: 32px;
  background-color: transparent;
  border: none;
  margin-right: 10px;
  margin-top: 5px;
  img {
    cursor: pointer;
    width: 100%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const RightSectionBodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;
export default RightSection;
