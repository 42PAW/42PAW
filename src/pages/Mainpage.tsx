import styled from "styled-components";

const Mainpage = () => {
  return (
    <MainAreaStyled>
      <MainStyled>
        <BoardCardStyled>
          <img src="/src/assets/oduck.png" />
        </BoardCardStyled>
        <ReactionBoxStyled>
          <img src="/src/assets/like.png" />
          <div>120</div>
          <img src="/src/assets/comment.png" />
          <div>8</div>
          <img src="/src/assets/scrap.png" />
        </ReactionBoxStyled>
      </MainStyled>
    </MainAreaStyled>
  );
};

const MainAreaStyled = styled.main`
  display: flex;
`;

const MainStyled = styled.div`
  display: flex;
  align-items: center;
  width: 55vw;
  border-right: 1px solid #929292;
`;

const BoardCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 900px;
  border: 2px solid #929292;
  border-radius: 10px;
  margin-left: 150px;
  img {
    margin-top: 80px;
    width: 650px;
  }
`;

const ReactionBoxStyled = styled.div`
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 160px;
  margin-top: 650px;
  img {
    width: 50px;
    margin-top: 10px;
  }
  div:nth-child(2) {
    margin-top: 5px;
  }
`;

export default Mainpage;
