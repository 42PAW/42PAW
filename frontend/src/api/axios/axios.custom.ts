import instance from "./axios.instance";
import axios from "axios";

const axiosGetBoardsURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/boards";
export const axiosGetBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await axios.get(axiosGetBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetTrendingBoardsURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/boards/hot";
export const axiosGetTrendingBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await axios.get(axiosGetTrendingBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetFollowingBoardsURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/boards/following";
export const axiosGetFollowingBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await axios.get(axiosGetFollowingBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetBoardCommentsURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/comments/boards/";
export const axiosGetBoardComments = async (boardId: number): Promise<any> => {
  try {
    const response = await axios.get(
      axiosGetBoardCommentsURL + boardId.toString()
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const axiosLikeCommentURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/reactions";
export const axiosLikeComment = async (boardId: number): Promise<any> => {
  try {
    const response = await axios.post(axiosLikeCommentURL, { boardId });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosDeleteLikeURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/reactions/boards/";
export const axiosDeleteLike = async (boardId: number): Promise<any> => {
  try {
    const response = await axios.delete(
      axiosDeleteLikeURL + boardId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosScrapCommentURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/scraps";
export const axiosScrapComment = async (boardId: number): Promise<any> => {
  try {
    const response = await axios.post(axiosScrapCommentURL, { boardId });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosDeleteScrapURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/scraps/boards/";
export const axiosDeleteScrap = async (boardId: number): Promise<any> => {
  try {
    const response = await axios.delete(
      axiosDeleteScrapURL + boardId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};
