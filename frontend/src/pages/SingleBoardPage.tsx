import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentBoardIdState } from "@/recoil/atom";
import useNavigateCustom from "@/hooks/useNavigateCustom";
import BoardTemplate from "@/components/Board/BoardTemplate";
import { IBoardInfo } from "@/types/interface/board.interface";
import { axiosGetSingleBoard } from "@/api/axios/axios.custom";
import SkeletonBoardTemplate from "@/components/skeletonView/SkeletonBoardTemplate";

const SingleBoardPage = () => {
  const [board, setBoard] = useState<IBoardInfo | null>(null);
  const [currentBoardId, setCurrentBoardId] =
    useRecoilState(currentBoardIdState);
  const { moveToMain } = useNavigateCustom();

  const getSingleBoard = async () => {
    const boardResponse: IBoardInfo = await axiosGetSingleBoard(
      currentBoardId as number
    );
    setBoard(boardResponse);
  };

  useEffect(() => {
    if (currentBoardId === null) moveToMain();
    getSingleBoard();
    return setCurrentBoardId(null); // unmount 시, currentBoardId를 null로 초기화
  }, []);

  return (
    <WrapperStyled>
      {board ? (
        <BoardTemplate
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
      ) : (
        <SkeletonBoardTemplate />
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  @media (min-width: 1024px) {
    // 모바일 뷰에서 게시물 짤림 현상 해결
    justify-content: center;
  }
`;

export default SingleBoardPage;
