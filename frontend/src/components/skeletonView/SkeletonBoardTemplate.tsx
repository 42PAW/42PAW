import styled from "styled-components";

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

const BoardWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  min-height: 600px;
  margin-top: 5%;
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
  background-color: var(--transparent);
`;

const SkeletonUserNameStyled = styled.div`
  width: 80px;
  height: 20px;
  margin-left: 10px;
  background-color: var(--transparent);
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
  width: 90%;
  background-color: var(--transparent);
`;

export default SkeletonBoardTemplate;
