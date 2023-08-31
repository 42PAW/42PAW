import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BoardTemplate from "@/components/Board/BoardTemplate";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import useFetch from "@/hooks/useFetch";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
  const { fetchBoards } = useFetch();
  const navigator = useNavigate();
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage, isError, isLoading } =
    useInfiniteQuery(
      ["boards", boardCategory],
      ({ pageParam = 0 }) => fetchBoards(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (!lastPage || lastPage.length === 0) return undefined;
          return allPages.length;
        },
        keepPreviousData: true,
      }
    );

  useEffect(() => {
    setBoardCategory(Board.DEFAULT);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (loading) {
    return (
      <WrapperStyled $boardExists={true}>
        <LoadingAnimation />
        <SkeletonBoardTemplate />
      </WrapperStyled>
    );
  }

  if (isError) {
    navigator("/error");
  }

  if (data?.pages[0].length === 0) {
    return (
      <WrapperStyled $boardExists={false}>
        <NoBoardsStyled>게시물이 존재하지 않습니다</NoBoardsStyled>
      </WrapperStyled>
    );
  }

  return (
    <WrapperStyled $boardExists={true}>
      {data?.pages.map((page) =>
        page.map((board: IBoardInfo) => (
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
        ))
      )}
      {hasNextPage && (
        <FetchObserverStyled ref={ref}>
          <LoadingCircleAnimation />
        </FetchObserverStyled>
      )}
      {!hasNextPage && (
        <BoardsEndStyled>더 이상 게시물이 존재하지 않습니다.</BoardsEndStyled>
      )}
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

const FetchObserverStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const NoBoardsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 1.3rem;
  opacity: 0.7;
  img {
    width: 50px;
    margin-bottom: 5px;
  }
`;

export default MainPage;
