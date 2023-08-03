import { atom } from "recoil";
import { IRightSectionContentInfo } from "../types/interface/right.section.interface";
import { ICurrentModalStateInfo } from "../types/interface/modal.interface";
import { BoardsInfoDTO, CommentInfoDTO } from "../types/dto/board.dto";
import { BoardCategory } from "../types/enum/board.category.enum";
import { IBanUserInfo } from "../types/interface/user.interface";

export const defaultBoardsState = atom<BoardsInfoDTO>({
  key: "defaultBoardsInfo",
  default: undefined,
});

export const trendingBoardsState = atom<BoardsInfoDTO>({
  key: "trendingBoardsInfo",
  default: undefined,
});

export const followingBoardsState = atom<BoardsInfoDTO>({
  key: "followingBoardsInfo",
  default: undefined,
});

export const boardCategoryState = atom<BoardCategory>({
  key: "boardCategory",
  default: BoardCategory.DEFAULT,
});

export const currentBoardCommentsState = atom<CommentInfoDTO[]>({
  key: "currentBoardComments",
  default: [],
});

export const isRightSectionOpenedState = atom<boolean>({
  key: "isRightSectionOpened",
  default: false,
});

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

export const currentBoardIdState = atom<number | null>({
  key: "currentBoardId",
  default: null,
});

export const currentCommentIdState = atom<number | null>({
  key: "currentCommentId",
  default: null,
});

export const currentOpenModalState = atom<ICurrentModalStateInfo>({
  key: "currenOpentModal",
  default: {
    banModal: false,
    reportModal: false,
    deleteModal: false,
    profileCardModal: false,
    profileEditModal: false,
  },
});

export const banUserInfoState = atom<IBanUserInfo>({
  key: "banUserInfo",
  default: {
    userName: "",
  },
});
