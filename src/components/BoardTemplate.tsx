import styled from "styled-components";

const BoardTemplate = () => {
  return (
    <>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <img src="/src/assets/profileImage.jpg" />
            <div>오덕애비</div>
            <div></div>
          </BoardProfileStyled>
          <BoardBurgerStyled>
            <img src="src/assets/burgerW.png" />
          </BoardBurgerStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <PhotoZoneWrapperStyled>
            <PhotoZoneStyled>
              <img src="/src/assets/oduck.png" />
            </PhotoZoneStyled>
            <ButtonZoneStyled>
              <LikeCommentContainerStyled>
                <img src="/src/assets/like.png" />
                <img src="/src/assets/comment.png" />
              </LikeCommentContainerStyled>
              <PhotoIndexDotsStyled>
                <img src="/src/assets/filledDot.png" />
              </PhotoIndexDotsStyled>
              <ScrapButtonStyled>
                <img src="/src/assets/scrap.png" />
              </ScrapButtonStyled>
            </ButtonZoneStyled>
          </PhotoZoneWrapperStyled>
          <BoardContentContainerStyled>
            <DivOne>좋아요 24개, 댓글 5개</DivOne>
            <DivTwo>캡션</DivTwo>
            <DivThree>댓글</DivThree>
          </BoardContentContainerStyled>
        </BoardBodyStyled>
      </BoardWrapperStyled>
    </>
  );
};

const BoardWrapperStyled = styled.div`
  border-radius: 50px;
  margin-top: 3%;
  margin-bottom: 3%;
  height: 800px;
  width: 90%;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
  min-height: 800px;
`;

const BoardHeaderStyled = styled.div`
  display: flex;
  background-color: #fdfdfd39;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  justify-content: space-between;
  width: 100%;
  height: 8%;
`;

const BoardProfileStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3%;
  width: 40%;
  img {
    width: 15%;
    border-radius: 100%;
  }
  div {
    margin-left: 3%;
    font-size: 150%;
    color: #ffffff;
  }
`;

const BoardBurgerStyled = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  background-color: transparent;
  border: none;
  img {
    width: 8%;
    margin-right: 10%;
  }
`;

const BoardBodyStyled = styled.div`
  height: 92%;
  background-color: #ffffff;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const PhotoZoneWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
  width: 100%;
`;

const PhotoZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95%;
  width: 100%;
  padding-top: 2%;
  img {
    width: 90%;
    border-radius: 30px;
  }
`;

const ButtonZoneStyled = styled.div`
  /* background-color: red; */
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikeCommentContainerStyled = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
  img:nth-child(1) {
    margin-left: 20%;
  }
  img {
    margin-left: 5%;
    width: 10%;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 33.3%;
  img {
    width: 10%;
    margin-right: 20%;
  }
`;

const BoardContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 100%;
`;

const DivOne = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  /* background-color: green; */
  padding-left: 7%;
`;

const DivTwo = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  padding-left: 7%;
  /* background-color: yellow; */
`;

const DivThree = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  padding-left: 7%;
  /* background-color: blue; */
`;

export default BoardTemplate;
