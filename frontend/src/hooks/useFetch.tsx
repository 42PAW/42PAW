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
  axiosGetBoardComments,
  axiosGetMyProfile,
  axiosGetProfile,
} from "@/api/axios/axios.custom";

const useFetch = () => {
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);

  const fetchBoards = async () => {
    try {
      if (boardCategory === Board.DEFAULT) {
        const response = await axiosGetBoards(20, 0);
        return response.result;
      }
      if (boardCategory === Board.TRENDING) {
        const response = await axiosGetTrendingBoards(20, 0);
        return response.result;
      }
      if (boardCategory === Board.FOLLOWING) {
        const response = await axiosGetFollowingBoards(20, 0);
        return response.result;
      }
      if (boardCategory === Board.MINE) {
        const response = await axiosGetMyBoards(20, 0);
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
  const [currentMemberId] = useRecoilState<number | null>(currentMemberIdState);

  const fetchProfile = async () => {
    try {
      if (!currentMemberId) return;
      if (!userInfo || userInfo.memberId !== currentMemberId) {
        const response = await axiosGetProfile(currentMemberId);
        return response;
      }
      const response = await axiosGetMyProfile();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchMyProfile = async () => {
    try {
      const response = await axiosGetMyProfile();
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { fetchBoards, fetchComments, fetchProfile, fetchMyProfile };
};

export default useFetch;
