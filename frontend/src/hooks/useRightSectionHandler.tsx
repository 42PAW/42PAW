import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isRightSectionOpenedState,
  rightSectionContentState,
} from "../recoil/atom";
import { IRightSectionContentInfo } from "../types/interface/right.section.interface";

/**오른쪽 섹션을 닫거나, 어떤 섹션을 열지 핸들링하기 위한 훅*/
const useRightSectionHandler = () => {
  const setIsRightSectionOpened = useSetRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const [rightSectionContent, setRightSectionContent] =
    useRecoilState<IRightSectionContentInfo>(rightSectionContentState);

  const openSearchSection = () => {
    setRightSectionContent({
      search: true,
      comment: false,
      follower: false,
      following: false,
      animalFilter: false,
    });
    setIsRightSectionOpened(true);
  };
  const openCommentSection = () => {
    setRightSectionContent({
      search: false,
      comment: true,
      follower: false,
      following: false,
      animalFilter: false,
    });
    setIsRightSectionOpened(true);
  };
  const closeRightSection = () => {
    setIsRightSectionOpened(false);
  };

  return {
    openSearchSection,
    openCommentSection,
    closeRightSection,
  };
};
export default useRightSectionHandler;
