import styled, { keyframes } from "styled-components";

const SkeletonBoardTemplate = () => {
  return (
    <>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <div>.</div>
            <div>.</div>
          </BoardProfileStyled>
          <BoardOptionButtonStyled></BoardOptionButtonStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <BoardPhotoBoxStyled />
          <ButtonZoneStyled>
            <ReactionCommentContainerStyled>
              <ReactionStyled>
                <img src="/assets/like.svg" />
              </ReactionStyled>
              <img src="/assets/comment.svg" />
            </ReactionCommentContainerStyled>
            <ScrapButtonStyled>
              <img src="/assets/scrap.svg" />
            </ScrapButtonStyled>
          </ButtonZoneStyled>
          <BoardContentContainerStyled>
            <ReactionCommentCountStyled>
              <div>.</div>
              <span>.</span>
            </ReactionCommentCountStyled>
            <ContentStyled>.</ContentStyled>
            <NoCommentStyled>.</NoCommentStyled>
          </BoardContentContainerStyled>
        </BoardBodyStyled>
      </BoardWrapperStyled>
    </>
  );
};

const waveAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

const BoardWrapperStyled = styled.div`
  width: 93%;
  max-width: 465px;
  margin-top: 3%;
  margin-bottom: 5%;
  border-radius: 25px;
  padding-bottom: 7%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
  background-color: var(--transparent);
`;

const BoardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background-color: var(--transparent);
`;

const BoardProfileStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4%;

  div:nth-child(1) {
    cursor: pointer;
    height: 60%;
    aspect-ratio: 1 / 1;
    margin-left: 2%;
    border-radius: 100%;
    background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
    background-size: 200% 200%;
    animation: ${waveAnimation} 2s ease infinite;
  }
  div:nth-child(2) {
    width: 120px;
    margin-left: 9%;
    font-size: 1.3rem;
    color: transparent;
    background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
    background-size: 200% 200%;
    animation: ${waveAnimation} 2s ease infinite;
  }
`;

const BoardOptionButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 9%;
  border: none;
  margin-right: 3%;
  &:focus {
    opacity: 0.6;
  }
`;

const BoardBodyStyled = styled.div`
  height: 96.2%;
  width: 100%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const BoardPhotoBoxStyled = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 2s ease infinite;
`;

const ButtonZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  height: 5%;
`;

const ReactionCommentContainerStyled = styled.div`
  display: flex;
  align-items: center;
  width: 33.3%;
  img {
    opacity: 0;
    cursor: pointer;
    margin-left: 7%;
    width: 26px;
  }
  img:hover {
    opacity: 0.5;
  }
  @media (max-width: 1023px) {
    margin-left: -5px;
  }
`;

const ReactionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    display: none;
    margin-left: 23px;
  }
`;

const ScrapButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 33.3%;
  img {
    display: none;
    cursor: pointer;
    width: 22px;
    margin-right: 15%;
  }
  img:hover {
    opacity: 0.5;
  }
`;

const BoardContentContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 11%;
  margin-top: 1.5%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 1%;
  font-size: 13px;
`;

const ReactionCommentCountStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 100%;
  font-weight: bold;
  color: transparent;
  span {
    font-weight: 400;
    font-size: 11px;
  }
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  font-size: 100%;
  color: transparent;
`;

const NoCommentStyled = styled.div`
  font-weight: 400;
  color: transparent;
  margin-top: 3%;
`;

export default SkeletonBoardTemplate;
