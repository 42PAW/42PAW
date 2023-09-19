import { atom } from "recoil";
import { IRightSectionContentInfo } from "@/types/interface/right.section.interface";
import { ICurrentModalStateInfo } from "@/types/interface/modal.interface";
import { BoardsInfoDTO, CommentInfoDTO } from "@/types/dto/board.dto";
import { Board } from "@/types/enum/board.category.enum";
import { IBanUserInfo } from "@/types/interface/user.interface";
import { IToastInfo } from "@/types/interface/toast.interface";
import Translator from "@/languages/Translator";
import { UserInfoDTO } from "@/types/dto/member.dto";
import { IDeleteInfo } from "@/types/interface/option.interface";
import { IBoardTotalLengthInfo } from "@/types/interface/board.interface";

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
export const boardCategoryState = atom<Board>({
  key: "boardCategory",
  default: Board.NONE,
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
    bannedMember: false,
  },
});

export const currentMemberIdState = atom<number | null>({
  key: "currentMemberId",
  default: null,
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
    loginModal: false,
    meatballModal: false,
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
    memberId: null,
    userName: "",
    followType: null,
  },
});

export const deleteInfoState = atom<IDeleteInfo>({
  key: "deleteInfo",
  default: {
    boardId: null,
    commentId: null,
  },
});

export const languageState = atom<any>({
  key: "language",
  default: Translator.en,
});

//검색창에서 프로필 카드 모달을 띄웠을 시 차단할 경우 프로필 카드 모달과 검색창 아이템의 팔로우 타입 버튼 모두 렌더링 해주기 위함
//정보 업데이트 후 새롭게 fetch하기 위한 콜백 함수들을 배열로 저장 후 foreach로 일괄 실행
export const callbackStoreState = atom<Function[]>({
  key: "callbackStore",
  default: [],
});

export const currentProfileBoardIdState = atom<number | null>({
  key: "currentProfileBoardId",
  default: null,
});

export const boardsLengthState = atom<number>({
  key: "boardsLength",
  default: 10000,
});

export const logoClickObserverState = atom<number>({
  key: "logoClickObserver",
  default: 0,
});

export const boardsTotalLengthState = atom<IBoardTotalLengthInfo>({
  key: "boardsTotalLength",
  default: {
    default: Infinity,
    trending: Infinity,
    following: Infinity,
  },
});
