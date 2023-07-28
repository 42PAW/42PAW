import styled from "styled-components";
import {
  isRightSectionOpenedState,
  rightSectionContentState,
} from "../../recoil/atom";
import { useRecoilState } from "recoil";
import CommentSection from "./CommentSection/CommentSection";
import SearchSection from "./SearchSection/SearchSection";
import AnimalFilterSection from "./AnimalFilterSection/AnimalFilterSection";
import useRightSectionHandler from "../../hooks/useRightSectionHandler";
import { IRightSectionContentInfo } from "../../types/interface/right.section.interface";

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
    </>
  );
};

const RightSectionStyled = styled.div<{
  $isRightSectionOpened: boolean;
}>`
  display: flex;
  position: relative;
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
  width: 8%;
  background-color: transparent;
  border: none;
  margin-right: 5px;
  margin-top: 5px;
  img {
    cursor: pointer;
    width: 20px;
  }
  img:hover {
    width: 23px;
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
