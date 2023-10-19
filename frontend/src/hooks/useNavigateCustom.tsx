import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentBoardIdState, isRightSectionOpenedState } from "@/recoil/atom";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import { getCookie } from "@/api/cookie/cookies";
import useModal from "./useModal";
import { ModalType } from "@/types/enum/modal.enum";

const token = getCookie("access_token");

/**useNavigate를 통해 라우트 간 이동할 때마다 RightSection을 Close해 주기 위한 훅 */
const useNavigateCustom = () => {
  const setIsRightSectionOpened = useSetRecoilState<boolean>(
    isRightSectionOpenedState
  );
  const setBoard = useSetRecoilState<Board>(boardCategoryState);
  const setCurrentBoardId = useSetRecoilState<number | null>(
    currentBoardIdState
  );
  const navigator = useNavigate();
  const { openModal } = useModal();

  const moveToMain = () => {
    setBoard(Board.DEFAULT);
    setIsRightSectionOpened(false);
    navigator("/");
  };

  const moveToNotice = () => {
    // 라우트 전환 시, Board를 default로 전환해 주지 않으면 이전 카테고리 게시글이 남아있는 현상을 방지
    setBoard(Board.DEFAULT);
    setIsRightSectionOpened(false);
    navigator("/notice");
  };

  const moveToMyProfile = () => {
    // 라우트 전환 시, Board를 default로 전환해 주지 않으면 이전 카테고리 게시글이 남아있는 현상을 방지
    setBoard(Board.MINE);
    setIsRightSectionOpened(false);
    navigator("/my-profile");
  };

  const moveToProfile = (memberId: number) => {
    // 라우트 전환 시, Board를 default로 전환해 주지 않으면 이전 카테고리 게시글이 남아있는 현상을 방지
    setBoard(Board.OTHER);
    setIsRightSectionOpened(false);
    navigator("/profile/" + memberId.toString());
  };

  const moveToUpload = () => {
    if (token === undefined) {
      openModal(ModalType.LOGIN);
      return;
    }
    setBoard(Board.DEFAULT);
    setIsRightSectionOpened(false);
    navigator("/upload");
  };

  const moveToMyProfileBoards = () => {
    setIsRightSectionOpened(false);
    navigator("/my-profile/boards");
  };

  const moveToMyProfileScrapped = () => {
    setIsRightSectionOpened(false);
    navigator("/my-profile/scrapped");
  };

  const moveToProfileBoards = (memberId: number) => {
    setIsRightSectionOpened(false);
    navigator("/profile/" + memberId.toString() + "/boards");
  };

  const moveToSingleBoard = (boardId: number) => {
    setIsRightSectionOpened(false);
    setCurrentBoardId(boardId);
    navigator("/board");
  };

  return {
    moveToMain,
    moveToNotice,
    moveToProfile,
    moveToMyProfile,
    moveToUpload,
    moveToMyProfileBoards,
    moveToMyProfileScrapped,
    moveToProfileBoards,
    moveToSingleBoard,
  };
};

export default useNavigateCustom;
