import axios from "axios";
import instance from "@/api/axios/axios.instance";
import { SignUpInfoDTO } from "@/types/dto/member.dto";
import { CreateBoardDTO } from "@/types/dto/board.dto";
import { getCookie } from "../cookie/cookies";
import { Language } from "@/types/enum/language.enum";
import { ReportReason } from "@/types/enum/report.enum";
import { AnimalSpecies } from "@/types/enum/animal.filter.enum";

const token = getCookie("access_token") ?? null;

const axiosSignUpURL = "/v1/members";
export const axiosSignUp = async ({
  memberName,
  imageData,
  statement,
  categoryFilters,
}: SignUpInfoDTO): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("memberName", memberName);
    formData.append("imageData", imageData ? imageData : "null");
    formData.append("statement", statement);
    categoryFilters.map((categoryFilter) => {
      formData.append("categoryFilters", categoryFilter);
    });
    const response = await instance.post(axiosSignUpURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosMyInfoURL = "/v1/members/me";
export const axiosMyInfo = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosMyInfoURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosCreateBoardURL = "/v1/boards";
export const axiosCreateBoard = async ({
  mediaDataList,
  categoryList,
  content,
}: CreateBoardDTO): Promise<any> => {
  try {
    const formData = new FormData();
    mediaDataList.forEach((file) => {
      formData.append(`mediaDataList`, file);
    });
    formData.append(
      "categoryList",
      new Blob([JSON.stringify(categoryList)], { type: "application/json" })
    );
    formData.append(
      "content",
      new Blob([content], { type: "application/json" })
    );
    const response = await instance.post(axiosCreateBoardURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetBoardsURL = "/v1/boards";
export const axiosGetBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    if (token) {
      const response = await instance.get(axiosGetBoardsURL, {
        params: { size: size, page: page },
      });
      return response.data;
    }
    const response = await axios.get(axiosGetBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetTrendingBoardsURL = "/v1/boards/hot";
export const axiosGetTrendingBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    if (token) {
      const response = await instance.get(axiosGetTrendingBoardsURL, {
        params: { size: size, page: page },
      });
      return response.data;
    }
    const response = await axios.get(axiosGetTrendingBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetFollowingBoardsURL = "/v1/boards/followings";
export const axiosGetFollowingBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await instance.get(axiosGetFollowingBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetMyBoardsURL = "/v1/members/me/boards";
export const axiosGetMyBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await instance.get(axiosGetMyBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetOtherBoardsURL = "/v1/boards/members/";
export const axiosGetOtherBoards = async (
  memberId: number,
  size: number,
  page: number
): Promise<any> => {
  try {
    if (token) {
      const response = await instance.get(
        axiosGetOtherBoardsURL + memberId.toString(),
        {
          params: { size: size, page: page },
        }
      );
      return response.data;
    }
    const response = await axios.get(
      axiosGetOtherBoardsURL + memberId.toString(),
      {
        params: { size: size, page: page },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const axiosGetScrappedBoardsURL = "/v1/scraps/members/me";
export const axiosGetScrappedBoards = async (
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await instance.get(axiosGetScrappedBoardsURL, {
      params: { size: size, page: page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetBoardCommentsURL = "/v1/comments/boards/";
export const axiosGetBoardComments = async (
  boardId: number,
  size: number,
  page: number
): Promise<any> => {
  try {
    const response = await instance.get(
      axiosGetBoardCommentsURL + boardId.toString(),
      {
        params: { size: size, page: page },
      }
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const axiosCreateCommentURL = "/v1/comments";
export const axiosCreateComment = async (
  boardId: number | null,
  content: string
): Promise<any> => {
  try {
    const response = await instance.post(axiosCreateCommentURL, {
      boardId,
      content,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosReactCommentURL = "/v1/reactions";
export const axiosReactComment = async (
  boardId: number,
  reactionType: string
): Promise<any> => {
  try {
    const response = await instance.post(axiosReactCommentURL, {
      boardId,
      reactionType,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUndoReactCommentURL = "/v1/reactions/boards/";
export const axiosUndoReactComment = async (boardId: number): Promise<any> => {
  try {
    if (token) {
      const response = await instance.delete(
        axiosUndoReactCommentURL + boardId.toString()
      );
      return response;
    }
    const response = await axios.delete(
      axiosUndoReactCommentURL + boardId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosGetProfileURL = "/v1/members/";
export const axiosGetProfile = async (memberId: number): Promise<any> => {
  try {
    if (token) {
      const response = await instance.get(
        axiosGetProfileURL + memberId.toString() + "/profile"
      );
      return response.data;
    }
    const response = await axios.get(
      axiosGetProfileURL + memberId.toString() + "/profile"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosGetMyProfileURL = "/v1/members/me/profile";
export const axiosGetMyProfile = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosGetMyProfileURL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosCheckNicknameValidURL = "/v1/members/valid";
export const axiosCheckNicknameValid = async (name: string): Promise<any> => {
  try {
    const response = await instance.get(axiosCheckNicknameValidURL, {
      params: { name: name },
    });
    return response.data.valid;
  } catch (error) {
    throw error;
  }
};

const axiosChangeLanguageURL = "/v1/members/me/language";
export const axiosChangeLanguage = async (language: Language): Promise<any> => {
  try {
    const response = await instance.patch(axiosChangeLanguageURL, { language });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosDeleteBoardURL = "/v1/boards/";
export const axiosDeleteBoard = async (boardId: number): Promise<any> => {
  try {
    const response = await instance.delete(
      axiosDeleteBoardURL + boardId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosDeleteCommentURL = "/v1/comments/";
export const axiosDeleteComment = async (commentId: number): Promise<any> => {
  try {
    const response = await instance.delete(
      axiosDeleteCommentURL + commentId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosScrapURL = "/v1/scraps";
export const axiosScrap = async (boardId: number): Promise<any> => {
  try {
    const response = await instance.post(axiosScrapURL, { boardId });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUndoScrapURL = "/v1/scraps/boards/";
export const axiosUndoScrap = async (boardId: number): Promise<any> => {
  try {
    const response = await instance.delete(
      axiosUndoScrapURL + boardId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosFollowURL = "/v1/follows";
export const axiosFollow = async (memberId: number): Promise<any> => {
  try {
    const response = await instance.post(axiosFollowURL, { memberId });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUnfollowURL = "/v1/follows/members/";
export const axiosUnfollow = async (memberId: number): Promise<any> => {
  try {
    const response = await instance.delete(
      axiosUnfollowURL + memberId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosBlockUserURL = "/v1/blocks";
export const axiosBlockUser = async (blockMemberId: number): Promise<any> => {
  try {
    const response = await instance.post(axiosBlockUserURL, { blockMemberId });
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosUndoBlockUserURL = "/v1/blocks/members/";
export const axiosUndoBlockUser = async (
  blockMemberId: number
): Promise<any> => {
  try {
    const response = await instance.delete(
      axiosUndoBlockUserURL + blockMemberId.toString()
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosReportURL = "/v1/reports";
export const axiosReport = async (
  reportedMemberId: number,
  content: string,
  reason: ReportReason,
  boardId: number | null,
  commentId: number | null
): Promise<any> => {
  try {
    const response = await instance.post(axiosReportURL, {
      reportedMemberId,
      boardId,
      commentId,
      reason,
      content,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const axiosGetWorldStatisticsURL = "/v1/statistics/world";
export const axiosGetWorldStatistics = async (): Promise<any> => {
  try {
    const response = await axios.get(axiosGetWorldStatisticsURL);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosGetSearchResultsURL = "/v1/members/search";
export const axiosGetSearchResults = async (
  name: string,
  size: number,
  page: number
): Promise<any> => {
  try {
    if (token) {
      const response = await instance.get(axiosGetSearchResultsURL, {
        params: { name: name, size: size, page: page },
      });
      return response.data.result;
    }
    const response = await axios.get(axiosGetSearchResultsURL, {
      params: { name: name, size: size, page: page },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const axiosUpdateAnimalCategoryURL = "/v1/categories/members/me";
export const axiosUpdateAnimalCategory = async (
  categories: AnimalSpecies[]
): Promise<any> => {
  try {
    const response = await instance.patch(axiosUpdateAnimalCategoryURL, {
      categories,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
