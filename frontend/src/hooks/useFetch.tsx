import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import {
  boardCategoryState,
  currentBoardIdState,
  userInfoState,
} from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import { UserInfoDTO } from "@/types/dto/member.dto";
import {
  axiosGetBoards,
  axiosGetTrendingBoards,
  axiosGetFollowingBoards,
  axiosGetMyBoards,
  axiosGetOtherBoards,
  axiosGetScrappedBoards,
  axiosGetBoardComments,
  axiosGetMyProfile,
  axiosGetProfile,
  axiosGetMyFollowerList,
  axiosGetFollowerList,
  axiosGetMyFollowingList,
  axiosGetFollowingList,
  axiosMyInfo,
} from "@/api/axios/axios.custom";
import { buttonToggledState } from "@/components/BoardSortToggle";
import useTranslator from "@/hooks/useTranslator";
import { boardsLengthState } from "@/recoil/atom";

const useFetch = (memberId?: number | null) => {
  const setBoardsLength = useSetRecoilState<number>(boardsLengthState);
  const resetBoardsLength = useResetRecoilState(boardsLengthState);
  const setBoardCategory = useSetRecoilState<Board>(boardCategoryState);
  const setButtonToggled = useSetRecoilState(buttonToggledState);
  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);
  const [userInfo, setUserInfo] = useRecoilState<UserInfoDTO | null>(
    userInfoState
  );
  const { translator } = useTranslator();

  const fetchBoards = async (boardCategory: Board, page?: number) => {
    resetBoardsLength();
    try {
      if (!page) page = 0;
      if (boardCategory === Board.DEFAULT) {
        const response = await axiosGetBoards(20, page);
        setBoardsLength(response.result.length);
        return response.result;
      }
      if (boardCategory === Board.TRENDING) {
        const response = await axiosGetTrendingBoards(20, page);
        setBoardsLength(response.result.length);
        return response.result;
      }
      if (boardCategory === Board.FOLLOWING) {
        const response = await axiosGetFollowingBoards(20, page);
        setBoardsLength(response.result.length);
        return response.result;
      }
      if (boardCategory === Board.MINE) {
        const response = await axiosGetMyBoards(1000, page);
        return response.result;
      }
      if (boardCategory === Board.SCRAPPED) {
        const response = await axiosGetScrappedBoards(1000, page);
        return response.result;
      }
      if (boardCategory === Board.OTHER) {
        if (!memberId) {
          return [];
        }
        const response = await axiosGetOtherBoards(memberId, 1000, page);
        return response.result;
      }
    } catch (error) {
      // 비 로그인 시 팔로우 게시물 접근 -> 기본 게시물로 이동
      if (boardCategory === Board.FOLLOWING) {
        setButtonToggled(0);
        setBoardCategory(Board.DEFAULT);
      }
      throw error;
    }
  };

  const fetchComments = async () => {
    try {
      if (!currentBoardId) {
        return;
      }
      const response = await axiosGetBoardComments(currentBoardId, 100, 0);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchProfile = async () => {
    try {
      if (!memberId || (userInfo && userInfo.memberId === memberId)) {
        const response = await axiosGetMyProfile();
        return response;
      }
      const response = await axiosGetProfile(memberId);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchFollowerList = async () => {
    try {
      if (!memberId) {
        const response = await axiosGetMyFollowerList(1000, 0);
        return response.result;
      }
      const response = await axiosGetFollowerList(memberId, 1000, 0);
      return response.result;
    } catch (error) {
      throw error;
    }
  };

  const fetchFollowingList = async () => {
    try {
      if (!memberId) {
        const response = await axiosGetMyFollowingList(1000, 0);
        return response.result;
      }
      const response = await axiosGetFollowingList(memberId, 1000, 0);
      return response.result;
    } catch (error) {
      throw error;
    }
  };

  const fetchMyInfo = async () => {
    try {
      const { data: myInfo } = await axiosMyInfo();

      setUserInfo(myInfo);
      translator(myInfo.language);
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchBoards,
    fetchComments,
    fetchProfile,
    fetchFollowerList,
    fetchFollowingList,
    fetchMyInfo,
  };
};

export default useFetch;
