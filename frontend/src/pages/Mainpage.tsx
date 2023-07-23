import styled from "styled-components";
import BoardTemplate from "../components/Board/BoardTemplate";
import LoadingCircleAnimation from "../components/loading/LoadingCircleAnimation";
import { useRecoilState } from "recoil";
import { defaultBoardsState } from "../recoil/atom";
import { BoardsInfoDTO } from "../types/dto/board.dto";
import { axiosGetBoards } from "../api/axios/axios.custom";
import { useEffect } from "react";

const Mainpage = () => {
  const [defaultBoards, setDefaultBoards] =
    useRecoilState<BoardsInfoDTO>(defaultBoardsState);

  const getBoardsData = async () => {
    try {
      const result = await axiosGetBoards(12, 0);
      setDefaultBoards(result);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getBoardsData();
  }, []);

  return (
    <WrapperStyled>
      {defaultBoards ? (
        defaultBoards.result.map((board: any) => (
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
            previewComment={board.previewComment}
            createdAt={board.createdAt}
          />
        ))
      ) : (
        <LoadingCircleAnimation />
      )}
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

export default Mainpage;
