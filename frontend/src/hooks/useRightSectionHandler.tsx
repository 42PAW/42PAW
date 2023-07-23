import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isRightSectionOpenedState,
  rightSectionContentState,
} from "../recoil/atom";
import { IRightSectionContentInfo } from "../types/interface/right.section.interface";

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
