import styled, { keyframes } from "styled-components";

const SkeletonBoardTemplate = () => {
  return (
    <>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <SkeletonProfileImageStyled />
            <SkeletonUserNameStyled />
          </BoardProfileStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <SkeletonPhotoBoxStyled />
        </BoardBodyStyled>
      </BoardWrapperStyled>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <SkeletonProfileImageStyled />
            <SkeletonUserNameStyled />
          </BoardProfileStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <SkeletonPhotoBoxStyled />
        </BoardBodyStyled>
      </BoardWrapperStyled>
      <BoardWrapperStyled>
        <BoardHeaderStyled>
          <BoardProfileStyled>
            <SkeletonProfileImageStyled />
            <SkeletonUserNameStyled />
          </BoardProfileStyled>
        </BoardHeaderStyled>
        <BoardBodyStyled>
          <SkeletonPhotoBoxStyled />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 93%;
  min-height: 660px;
  margin-top: 3%;
  margin-bottom: 5%;
  background-color: var(--transparent);
  border-radius: 25px;
`;

const BoardHeaderStyled = styled.div`
  width: 100%;
  display: flex;
  height: 10%;
  background-color: transparent;
  margin-left: 10%;
`;

const BoardProfileStyled = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
`;

const SkeletonProfileImageStyled = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  margin-left: 3%;
  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 3s ease infinite;
`;

const SkeletonUserNameStyled = styled.div`
  width: 80px;
  height: 20px;
  margin-left: 10px;
  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 3s ease infinite;
`;

const BoardBodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

const SkeletonPhotoBoxStyled = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 78%;
  width: 100%;
  background: linear-gradient(270deg, var(--lightpurple), var(--lightpink));
  background-size: 200% 200%;
  animation: ${waveAnimation} 2s ease infinite;
`;

export default SkeletonBoardTemplate;
