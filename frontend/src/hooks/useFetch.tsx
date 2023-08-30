import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  boardCategoryState,
  currentBoardIdState,
  currentMemberIdState,
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
} from "@/api/axios/axios.custom";

const useFetch = (memberId?: number | null) => {
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const [currentMemberId] = useRecoilState<number | null>(currentMemberIdState);

  const fetchBoards = async (page?: number) => {
    try {
      if (!page) page = 0;
      if (boardCategory === Board.DEFAULT) {
        const response = await axiosGetBoards(20, page);
        return response.result;
      }
      if (boardCategory === Board.TRENDING) {
        const response = await axiosGetTrendingBoards(20, page);
        return response.result;
      }
      if (boardCategory === Board.FOLLOWING) {
        const response = await axiosGetFollowingBoards(20, page);
        return response.result;
      }
      if (boardCategory === Board.MINE) {
        const response = await axiosGetMyBoards(1000, page);
        return response.result;
      }
      if (boardCategory === Board.OTHER) {
        if (!memberId) {
          return;
        }
        const response = await axiosGetOtherBoards(memberId, 20, page);
        return response.result;
      }
      if (boardCategory === Board.SCRAPPED) {
        const response = await axiosGetScrappedBoards(20, page);
        return response.result;
      }
    } catch (error) {
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
      if (!memberId) return;
      if (!userInfo || userInfo.memberId !== memberId) {
        const response = await axiosGetProfile(memberId);
        // console.log(response);
        return response;
      }
      const response = await axiosGetMyProfile();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchMyProfile = async () => {
    // TODO: fetchProfile과 합치기
    try {
      const response = await axiosGetMyProfile();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchFollowerList = async () => {
    try {
      if (!memberId) {
        console.log("fetchFollowerList", memberId);
        const response = await axiosGetMyFollowerList(1000, 0);
        return response.result;
      }
      const response = await axiosGetFollowerList(memberId, 1000, 0);
      return response.result;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchBoards,
    fetchComments,
    fetchProfile,
    fetchMyProfile,
    fetchFollowerList,
  };
};

export default useFetch;
