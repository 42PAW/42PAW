import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import BoardTemplate from "@/components/Board/BoardTemplate";
import { currentProfileBoardIdState } from "@/recoil/atom";
import { IBoardInfo } from "@/types/interface/board.interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { boardCategoryState } from "@/recoil/atom";
import { Board } from "@/types/enum/board.category.enum";
import useFetch from "@/hooks/useFetch";
import LoadingCircleAnimation from "@/components/loading/LoadingCircleAnimation";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";
import LoadingAnimation from "@/components/loading/LoadingAnimation";
import { useNavigate, useParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const ProfileBoardsPage = () => {
  const { debounce } = useDebounce();
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const [boardCategory, setBoardCategory] =
    useRecoilState<Board>(boardCategoryState);
  const [ref, inView] = useInView();
  const { memberId } = useParams<{ memberId: string }>();
  const { fetchBoards } = useFetch(Number(memberId));
  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery(
    ["boards", boardCategory],
    ({ pageParam = 0 }) => fetchBoards(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length === 0) return undefined;
        return allPages.length;
      },
    }
  );
  const [currentProfileBoardId] = useRecoilState(currentProfileBoardIdState);

  useEffect(() => {
    setBoardCategory(Board.OTHER);
    setLoading(true);
    debounce("profileBoardsLoading", () => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (loading) {
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
            scrollIntoView={
              board.boardId === currentProfileBoardId ? true : false
            }
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

export default ProfileBoardsPage;
