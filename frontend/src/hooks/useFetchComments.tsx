import { useRecoilState } from "recoil";
import { currentBoardIdState } from "@/recoil/atom";
import { axiosGetBoardComments } from "@/api/axios/axios.custom";

const useFetchComments = () => {
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

  return {
    fetchComments,
  };
};

export default useFetchComments;
