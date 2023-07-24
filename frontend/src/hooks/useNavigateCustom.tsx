import { isRightSectionOpenedState } from "../recoil/atom";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { boardCategoryState } from "../recoil/atom";
import { BoardCategory } from "../types/enum/board.category.enum";

/**useNavigate를 통해 라우트 간 이동할 때마다 RightSection을 Close해 주기 위한 훅 */
const useNavigateCustom = () => {
  const setIsRightSectionOpened = useSetRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const setBoardCategory = useSetRecoilState<BoardCategory>(boardCategoryState);
  const navigator = useNavigate();

  const moveToMain = () => {
    setIsRightSectionOpened(false);
    navigator("/");
  };

  const moveToNotice = () => {
    // 라우트 전환 시, BoardCategory를 default로 전환해 주지 않으면 이전 카테고리 게시글이 남아있는 현상을 방지
    setBoardCategory(BoardCategory.DEFAULT);
    setIsRightSectionOpened(false);
    navigator("/notice");
  };

  const moveToMyProfile = () => {
    // 라우트 전환 시, BoardCategory를 default로 전환해 주지 않으면 이전 카테고리 게시글이 남아있는 현상을 방지
    setBoardCategory(BoardCategory.DEFAULT);
    setIsRightSectionOpened(false);
    navigator("/profile");
  };

  const moveToUpload = () => {
    // 라우트 전환 시, BoardCategory를 default로 전환해 주지 않으면 이전 카테고리 게시글이 남아있는 현상을 방지
    setBoardCategory(BoardCategory.DEFAULT);
    setIsRightSectionOpened(false);
    navigator("/upload");
  };

  return {
    moveToMain,
    moveToNotice,
    moveToMyProfile,
    moveToUpload,
  };
};

export default useNavigateCustom;
