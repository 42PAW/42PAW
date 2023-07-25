import styled from "styled-components";
import { axiosGetBoardComments } from "../../api/axios/axios.custom";
import useRightSectionHandler from "../../hooks/useRightSectionHandler";
import { currentBoardCommentsState } from "../../recoil/atom";
import { useSetRecoilState } from "recoil";
import { CommentInfoDTO } from "../../types/dto/board.dto";
import { IBoardInfo } from "../../types/interface/board.interface";
import BoardPhotoBox from "./BoardPhotoBox";
import OptionButton from "../OptionButton";

const BoardTemplate = (board: IBoardInfo) => {
  const {
    boardId,
    memberName,
    profileImage,
    images,
    categories,
    reactionCount,
    commentCount,
    isScrapped,
    isReacted,
    content,
    previewCommentUser,
    previewComment,
    createdAt,
  } = board;

  const setCurrentBoardComments = useSetRecoilState<CommentInfoDTO[]>(
    currentBoardCommentsState
  );
  const { openCommentSection } = useRightSectionHandler();

  const getCommentsData = async (boardId: number) => {
    try {
      const result = await axiosGetBoardComments(boardId);
      setCurrentBoardComments(result);
    } catch (error) {
      throw error;
    }
  };
  const handleCommentClick = (boardId: number) => {
    openCommentSection();
    getCommentsData(boardId);
  };
  return (
    <>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <img src={profileImage} />
            <div>{memberName}</div>
            <div></div>
          </BoardProfileStyled>
          <BoardOptionButtonStyled>
            <OptionButton />
          </BoardOptionButtonStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <BoardPhotoBox boardImages={images} />
          <ButtonZoneStyled>
            <LikeCommentContainerStyled>
              {isReacted ? (
                <img src="/src/assets/likeR.png" />
              ) : (
                <img src="/src/assets/like.png" />
              )}

              <img
                src="/src/assets/comment.png"
                onClick={() => handleCommentClick(boardId)}
              />
            </LikeCommentContainerStyled>
            <ScrapButtonStyled>
              {isScrapped ? (
                <img src="/src/assets/scrapB.png" />
              ) : (
                <img src="/src/assets/scrap.png" />
              )}
            </ScrapButtonStyled>
          </ButtonZoneStyled>
          <BoardContentContainerStyled>
            <DivOne>
              <div>
                좋아요 {reactionCount}개, 댓글 {commentCount}개
              </div>
              <span>{createdAt}</span>
            </DivOne>
            <DivTwo>{content}</DivTwo>
            <DivThree>
              <div>{previewCommentUser}</div>
              <div>{previewComment}</div>
              <div onClick={() => handleCommentClick(1)}>..댓글 더 보기</div>
            </DivThree>
          </BoardContentContainerStyled>
        </BoardBodyStyled>
      </BoardWrapperStyled>
    </>
  );
};

const BoardWrapperStyled = styled.div`
  width: 90%;
  min-height: 640px;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 30px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
`;

const BoardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: var(--transparent);
`;

const BoardProfileStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 6%;
  width: 40%;
  img {
    width: 20%;
    border-radius: 100%;
  }
  div {
    margin-left: 5%;
    font-size: 120%;
    color: var(--white);
  }
`;

const BoardOptionButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 9%;
  border: none;
  margin-right: 3%;
  z-index: 2;
  &:focus {
    opacity: 0.6;
  }
`;

const BoardBodyStyled = styled.div`
  height: 90%;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: var(--white);
`;

const ButtonZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1%;
  height: 5%;
`;

const LikeCommentContainerStyled = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
  img:nth-child(1) {
    margin-left: 15%;
  }
  img {
    cursor: pointer;
    margin-left: 7%;
    width: 13%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const ScrapButtonStyled = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 33.3%;
  img {
    width: 13%;
    margin-right: 15%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const BoardContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 14%;
  margin-top: 1.5%;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 14px;
`;

const DivOne = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 100%;
  font-weight: bold;
  span {
    font-weight: 400;
    font-size: 11px;
  }
`;

const DivTwo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  font-size: 100%;
`;

const DivThree = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3%;
  font-size: 100%;
  div:nth-child(1) {
    margin-right: 1%;
    font-weight: bold;
  }
  div:nth-child(3) {
    cursor: pointer;
    margin-left: 2%;
    color: var(--lightgrey);
  }
`;

export default BoardTemplate;
