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
import { useEffect } from "react";

const MainPage = () => {
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
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

  useEffect(() => {
    setBoardCategory(Board.DEFAULT);
  }, []);

  if (isLoading) {
    return (
      <WrapperStyled $boardExists={true}>
        <SkeletonBoardTemplate />
        <LoadingAnimation />
      </WrapperStyled>
    );
  }

  if (isError) {
    navigator("/error");
  }

  if (!boards.length) {
    return (
      <WrapperStyled $boardExists={false}>
        <NoBoardsStyled>
          <img src="/src/assets/noBoard.png" />
          게시물이 존재하지 않습니다
        </NoBoardsStyled>
      </WrapperStyled>
    );
  }

  return (
    <WrapperStyled $boardExists={true}>
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
      <BoardsEndStyled>더 이상 게시물이 존재하지 않습니다.</BoardsEndStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div<{ $boardExists?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.$boardExists ? "none" : "center")};
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
`;

const BoardsEndStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 30px;
  color: var(--white);
`;

const NoBoardsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 1.2rem;
  opacity: 0.7;
  img {
    width: 50px;
    margin-bottom: 5px;
  }
`;

export default MainPage;
