import { useRecoilState, useSetRecoilState } from "recoil";
import {
  trendingBoardsState,
  followingBoardsState,
  boardCategoryState,
} from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import {
  axiosGetBoards,
  axiosGetTrendingBoards,
  axiosGetFollowingBoards,
} from "@/api/axios/axios.custom";
import { BoardsInfoDTO } from "@/types/dto/board.dto";

const useFetchBoards = () => {
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const setTrendingBoards =
    useSetRecoilState<BoardsInfoDTO>(trendingBoardsState);
  const setFollowingBoards =
    useSetRecoilState<BoardsInfoDTO>(followingBoardsState);

  const fetchBoards = async () => {
    try {
      if (boardCategory === Board.DEFAULT) {
        const response = await axiosGetBoards(12, 0);
        return response.result;
      }
      if (boardCategory === Board.TRENDING) {
        const response = await axiosGetTrendingBoards(12, 0);
        setTrendingBoards(response);
      }
      if (boardCategory === Board.FOLLOWING) {
        const response = await axiosGetFollowingBoards(12, 0);
        setFollowingBoards(response);
      }
    } catch (error) {
      throw error;
    }
  };
  return { fetchBoards };
};

export default useFetchBoards;
