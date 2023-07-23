import styled from "styled-components";
import { axiosGetBoardComments } from "../../api/axios/axios.custom";
import useRightSectionHandler from "../../hooks/useRightSectionHandler";
import { currentBoardCommentsState } from "../../recoil/atom";
import { useSetRecoilState } from "recoil";
import { CommentInfoDTO } from "../../types/dto/board.dto";

const BoardTemplate = () => {
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
            <img src="/src/assets/profileImage.jpg" />
            <div>오덕애비</div>
            <div></div>
          </BoardProfileStyled>
          <BoardOptionButtonStyled>
            <img src="src/assets/optionW.png" />
          </BoardOptionButtonStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <PhotoZoneWrapperStyled>
            <PhotoZoneStyled>
              <img src="/src/assets/oduck.png" />
            </PhotoZoneStyled>
          </PhotoZoneWrapperStyled>
          <ButtonZoneStyled>
            <LikeCommentContainerStyled>
              <img src="/src/assets/like.png" />
              <img
                src="/src/assets/comment.png"
                onClick={() => handleCommentClick(1)}
              />
            </LikeCommentContainerStyled>
            <PhotoIndexDotsStyled>
              <img src="/src/assets/filledDot.png" />
            </PhotoIndexDotsStyled>
            <ScrapButtonStyled>
              <img src="/src/assets/scrap.png" />
            </ScrapButtonStyled>
          </ButtonZoneStyled>
          <BoardContentContainerStyled>
            <DivOne>좋아요 24개, 댓글 5개</DivOne>
            <DivTwo>오늘 날씨도 좋은데 오덕이는 집에만 있네😂</DivTwo>
            <DivThree>
              <div>아롱사태</div>
              <div>오덕이 귀엽다 내일 만나러 갈게!</div>
              <div onClick={() => handleCommentClick(1)}>...댓글 더 보기</div>
            </DivThree>
          </BoardContentContainerStyled>
        </BoardBodyStyled>
      </BoardWrapperStyled>
    </>
  );
};

const BoardWrapperStyled = styled.div`
  width: 90%;
  min-height: 660px;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 50px;
  box-shadow: var(--default-shadow);
`;

const BoardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
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

const BoardOptionButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
  background-color: transparent;
  border: none;
  img {
    width: 13%;
    margin-right: 10%;
  }
`;

const BoardBodyStyled = styled.div`
  height: 90%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: var(--white);
`;

const PhotoZoneWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const PhotoZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
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
    margin-left: 10%;
    width: 13%;
  }
  img:hover {
    opacity: 0.7;
  }
`;

const PhotoIndexDotsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.3%;
  img {
    width: 3%;
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
  flex-direction: column;
  font-size: 100%;
  font-weight: bold;
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
