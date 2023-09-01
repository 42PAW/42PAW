import { useRecoilState, useSetRecoilState } from "recoil";
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
} from "@/api/axios/axios.custom";
import { buttonToggledState } from "@/components/BoardSortToggle";

const useFetch = (memberId?: number | null) => {
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
  const setButtonToggled = useSetRecoilState(buttonToggledState);

  const fetchBoards = async (page?: number) => {
    try {
      if (!page) page = 0;
      if (boardCategory === Board.DEFAULT) {
        const response = await axiosGetBoards(10, page);
        return response.result;
      }
      if (boardCategory === Board.TRENDING) {
        const response = await axiosGetTrendingBoards(10, page);
        return response.result;
      }
      if (boardCategory === Board.FOLLOWING) {
        const response = await axiosGetFollowingBoards(10, page);
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

  const [currentBoardId] = useRecoilState<number | null>(currentBoardIdState);

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

  const [userInfo] = useRecoilState<UserInfoDTO | null>(userInfoState);

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

  //   const fetchBanList = async () => {
  //     try {
  //       const response = await axiosGetBanList(1000, 0);

  return {
    fetchBoards,
    fetchComments,
    fetchProfile,
    fetchFollowerList,
    fetchFollowingList,
  };
};

export default useFetch;
