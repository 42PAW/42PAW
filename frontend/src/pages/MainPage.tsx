import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BoardTemplate from "@/components/Board/BoardTemplate";
import {
  trendingBoardsState,
  followingBoardsState,
  boardCategoryState,
} from "@/recoil/atom";
import { BoardsInfoDTO } from "@/types/dto/board.dto";
import { Board } from "@/types/enum/board.category.enum";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import useFetchBoards from "@/hooks/useFetchBoards";
import { IBoardInfo } from "@/types/interface/board.interface";

const MainPage = () => {
  const [trendingBoards] = useRecoilState<BoardsInfoDTO>(trendingBoardsState);
  const [followingBoards] = useRecoilState<BoardsInfoDTO>(followingBoardsState);
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const { fetchBoards } = useFetchBoards();
  const {
    isLoading,
    isError,
    data: defaultBoards,
    error,
  } = useQuery({
    queryKey: [Board.DEFAULT],
    queryFn: fetchBoards,
  });

  const getBoardsToRender = () => {
    switch (boardCategory) {
      case Board.DEFAULT:
        return defaultBoards;
      case Board.TRENDING:
        return trendingBoards;
      case Board.FOLLOWING:
        return followingBoards;
      default:
        return null;
    }
  };

  const currentBoards = getBoardsToRender();

  if (isLoading) {
    return (
      <WrapperStyled>
        <SkeletonBoardTemplate />
        <LoadingAnimation />
      </WrapperStyled>
    );
  }

  return (
    <WrapperStyled>
      {currentBoards.map((board: IBoardInfo) => (
        <BoardTemplate
          key={board.boardId}
          boardId={board.boardId}
          memberId={board.memberId}
          memberName={board.memberName}
          intraName={board.intraName}
          profileImageUrl={board.profileImageUrl}
          country={board.country}
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
      ))}
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
