import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardCategoryState, boardsTotalLengthState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import useFetch from "@/hooks/useFetch";
import {
  IBoardInfo,
  IBoardTotalLengthInfo,
} from "@/types/interface/board.interface";
import { useNavigate } from "react-router-dom";
import { LegacyRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";
import useDebounce from "@/hooks/useDebounce";
import { useRef } from "react";
import { boardsLengthState, languageState } from "@/recoil/atom";
import { buttonToggledState } from "@/components/BoardSortToggle";
import { useQueryClient } from "@tanstack/react-query";
import BoardTemplate from "@/components/Board/BoardTemplate";

const MainPage = () => {
  //useInview의 ref값을 참조하는 요소에 대한 root 참조값
  const rootRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const [language] = useRecoilState<any>(languageState);
  const [loading, setLoading] = useState(true);
  const setButtonToggled = useSetRecoilState(buttonToggledState);
  const [boardsLength] = useRecoilState<number>(boardsLengthState);
  const [boardsTotalLength] = useRecoilState<IBoardTotalLengthInfo>(
    boardsTotalLengthState
  );
  const resetBoardsTotalLength = useResetRecoilState(boardsTotalLengthState);
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
  const { fetchBoards } = useFetch();
  const navigator = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: false,
    root: rootRef.current,
    rootMargin: `0px 0px ${boardsLength * 300}px 0px`, //ref를 참조하는 요소를 root 기준 margin bottom을 줌. 300px을 준 이유는 한 게시물의 길이를 대략적으로 600px로 보았기 때문. 전체 게시물 길이의 절반에 왔을 때 fetch 유도.
  });
  const { debounce } = useDebounce();
  const { data, fetchNextPage, hasNextPage, isError, isLoading } =
    useInfiniteQuery(
      ["boards", boardCategory],
      ({ pageParam = 0 }) => fetchBoards(boardCategory, pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (!lastPage) return undefined;
          if (
            (boardCategory === Board.DEFAULT &&
              boardsTotalLength.default <= allPages.length * 20) ||
            (boardCategory === Board.TRENDING &&
              boardsTotalLength.trending <= allPages.length * 20) ||
            (boardCategory === Board.FOLLOWING &&
              boardsTotalLength.following <= allPages.length * 20)
          )
            return undefined;
          return allPages.length;
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      }
    );

  useEffect(() => {
    setBoardCategory(Board.DEFAULT);
    setButtonToggled(0);
    return () => {
      const mainBoardCategories = [
        Board.DEFAULT,
        Board.TRENDING,
        Board.FOLLOWING,
      ];
      for (let i = 0; i < mainBoardCategories.length; i++) {
        queryClient.resetQueries(["boards", mainBoardCategories[i]]);
      }
      resetBoardsTotalLength();
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    // 스켈레톤 뷰를 보여주기 위한 loading 시간
    setLoading(true);
    debounce("mainPageLoading", () => setLoading(false), 500);
    //게시물 카테고리 변경할 때마다 화면 맨 위로 스크롤
    if (rootRef.current) {
      rootRef.current.scrollTop = 0;
    }
  }, [boardCategory]);

  if (loading || isLoading) {
    return (
      <WrapperStyled $boardExists={true}>
        <LoadingAnimation />
        <SkeletonBoardTemplate />
        <SkeletonBoardTemplate />
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
        <NoBoardsStyled>{language.noPostsExist}</NoBoardsStyled>
      </WrapperStyled>
    );
  }

  return (
    <WrapperStyled
      $boardExists={true}
      ref={rootRef as LegacyRef<HTMLDivElement>}
    >
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
            followType={board.followType}
          />
        ))
      )}
      {hasNextPage && (
        <BoardsEndStyled ref={ref}>
          <LoadingCircleAnimation />
        </BoardsEndStyled>
      )}
      {!hasNextPage && (
        <BoardsEndStyled>{language.noMorePosts}</BoardsEndStyled>
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
  height: calc(var(--vh, 1vh) * 100);
`;

const BoardsEndStyled = styled.div`
  position: relative;
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
  font-size: 1.3rem;
  opacity: 0.7;
`;

export default MainPage;
