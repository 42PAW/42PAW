import styled from "styled-components";
import BoardTemplate from "@/components/Board/BoardTemplate";
import { useRecoilState } from "recoil";
import {
  defaultBoardsState,
  trendingBoardsState,
  followingBoardsState,
  boardCategoryState,
} from "@/recoil/atom";
import { BoardsInfoDTO } from "@/types/dto/board.dto";
import {
  axiosGetBoards,
  axiosGetTrendingBoards,
  axiosGetFollowingBoards,
} from "@/api/axios/axios.custom";
import { useEffect } from "react";
import { BoardCategory } from "@/types/enum/board.category.enum";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";
import LoadingAnimation from "@/components/loading/LoadingAnimation";

const MainPage = () => {
  const [defaultBoards, setDefaultBoards] =
    useRecoilState<BoardsInfoDTO>(defaultBoardsState);
  const [trendingBoards, setTrendingBoards] =
    useRecoilState<BoardsInfoDTO>(trendingBoardsState);
  const [followingBoards, setFollowingBoards] =
    useRecoilState<BoardsInfoDTO>(followingBoardsState);
  const [boardCategory] = useRecoilState<BoardCategory>(boardCategoryState);

  useEffect(() => {
    getBoardsData();
  }, [boardCategory]);

  const getBoardsData = async () => {
    try {
      if (boardCategory === BoardCategory.DEFAULT) {
        const result = await axiosGetBoards(12, 0);
        setDefaultBoards(result);
      }
      if (boardCategory === BoardCategory.TRENDING) {
        const result = await axiosGetTrendingBoards(12, 0);
        setTrendingBoards(result);
      }
      if (boardCategory === BoardCategory.FOLLOWING) {
        const result = await axiosGetFollowingBoards(12, 0);
        setFollowingBoards(result);
      }
    } catch (error) {
      throw error;
    }
  };
  const getBoardsToRender = () => {
    switch (boardCategory) {
      case BoardCategory.DEFAULT:
        return defaultBoards;
      case BoardCategory.TRENDING:
        return trendingBoards;
      case BoardCategory.FOLLOWING:
        return followingBoards;
      default:
        return null;
    }
  };

  const currentBoards = getBoardsToRender();

  return (
    <WrapperStyled>
      {currentBoards ? (
        currentBoards.result.map((board: any) => (
          <BoardTemplate
            key={board.boardId}
            boardId={board.boardId}
            memberName={board.memberName}
            profileImage={board.profileImage}
            images={board.images}
            categories={board.categories}
            reactionCount={board.reactionCount}
            commentCount={board.commentCount}
            isScrapped={board.isScrapped}
            isReacted={board.isReacted}
            content={board.content}
            previewCommentUser={board.previewCommentUser}
            previewComment={board.previewComment}
            createdAt={board.createdAt}
          />
        ))
      ) : (
        <>
          <SkeletonBoardTemplate />
          <LoadingAnimation />
        </>
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
`;

export default MainPage;
