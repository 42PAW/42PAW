import instance from "./axios.instance";
import axios from "axios";

const axiosGetBoardCommentsURL =
  "https://0dcc640b-fbc6-43f0-b2b0-3c731df8e55e.mock.pstmn.io/v1/boards/";
export const axiosGetBoardComments = async (boardId: number): Promise<any> => {
  try {
    const response = await axios.get(
      axiosGetBoardCommentsURL + boardId.toString() + "/comments"
    );
    return response.data.result;
  } catch (error) {
    throw error;
  }
};
