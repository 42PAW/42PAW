import { atom } from "recoil";
import { IRightSectionContentInfo } from "../types/interface/right.section.interface";
import { BoardsInfoDTO, CommentInfoDTO } from "../types/dto/board.dto";

export const defaultBoardsState = atom<BoardsInfoDTO>({
  key: "defaultBoardsInfo",
  default: undefined,
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
