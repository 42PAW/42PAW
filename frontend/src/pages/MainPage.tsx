import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BoardTemplate from "@/components/Board/BoardTemplate";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import useFetch from "@/hooks/useFetch";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [boardCategory] = useRecoilState<Board>(boardCategoryState);
  const { fetchBoards } = useFetch();
  const navigator = useNavigate();
  const {
    isLoading,
    isError,
    data: boards,
  } = useQuery({
    queryKey: ["boards", boardCategory],
    queryFn: fetchBoards,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <WrapperStyled>
        <SkeletonBoardTemplate />
        <LoadingAnimation />
      </WrapperStyled>
    );
  }

  if (isError) {
    navigator("/error");
  }

  return (
    <WrapperStyled>
      {boards.map((board: IBoardInfo) => (
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
          scrapped={board.scrapped}
          reacted={board.reacted}
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
