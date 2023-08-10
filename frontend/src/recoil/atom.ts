import { atom } from "recoil";
import { IRightSectionContentInfo } from "@/types/interface/right.section.interface";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { BoardsInfoDTO, CommentInfoDTO } from "@/types/dto/board.dto";
import { BoardCategory } from "@/types/enum/board.category.enum";
import { IBanUserInfo } from "@/types/interface/user.interface";
import { IToastInfo } from "@/types/interface/toast.interface";
import Translator from "@/languages/Translator";
import { UserInfoDTO } from "@/types/dto/member.dto";

export const userInfoState = atom<UserInfoDTO | null>({
  key: "userInfo",
  default: null,
});

/**현재까지 불러온 기본 정렬 게시물 목록*/
export const defaultBoardsState = atom<BoardsInfoDTO>({
  key: "defaultBoardsInfo",
  default: undefined,
});

/**현재까지 불러온 인기 순 정렬 게시물 목록*/
export const trendingBoardsState = atom<BoardsInfoDTO>({
  key: "trendingBoardsInfo",
  default: undefined,
});

/**현재까지 불러온 팔로잉 순 정렬 게시물 목록*/
export const followingBoardsState = atom<BoardsInfoDTO>({
  key: "followingBoardsInfo",
  default: undefined,
});

/**MainPage에서 게시물 정렬하는 방식(default, trending, following)을 기억하는 state*/
export const boardCategoryState = atom<BoardCategory>({
  key: "boardCategory",
  default: BoardCategory.DEFAULT,
});

/**현재 게시물의 댓글 목록*/
export const currentBoardCommentsState = atom<CommentInfoDTO[]>({
  key: "currentBoardComments",
  default: [],
});

/**오른쪽 섹션이 현재 열려 있는지에 대한 boolean state*/
export const isRightSectionOpenedState = atom<boolean>({
  key: "isRightSectionOpened",
  default: false,
});

/**현재 오른쪽 섹션에 어떤 섹션이 렌더링 되고 있는지 각 섹션에 대해 boolean 속성을 담는 state*/
export const rightSectionContentState = atom<IRightSectionContentInfo>({
  key: "rightSectionContent",
  default: {
    search: false,
    comment: false,
    follower: false,
    following: false,
    animalFilter: false,
  },
});

/**현재 게시물의 id */
export const currentBoardIdState = atom<number | null>({
  key: "currentBoardId",
  default: null,
});

/**현재 댓글의 id */
export const currentCommentIdState = atom<number | null>({
  key: "currentCommentId",
  default: null,
});

/**현재 모달에 어떤 유형의 모달이 렌더링 되고 있는지 각 모달 유형에 대해 boolean 속성을 담는 state */
export const currentOpenModalState = atom<ICurrentModalStateInfo>({
  key: "currenOpentModal",
  default: {
    banModal: false,
    reportModal: false,
    deleteModal: false,
    profileCardModal: false,
    profileEditModal: false,
    languageModal: false,
  },
});

export const toastMessagesState = atom<IToastInfo[]>({
  key: "toastMessages",
  default: [],
});

/**현재 밴할 대상인 유저 */
export const banUserInfoState = atom<IBanUserInfo>({
  key: "banUserInfo",
  default: {
    userName: "",
  },
});

export const languageState = atom<any>({
  key: "language",
  default: Translator.ko,
});
