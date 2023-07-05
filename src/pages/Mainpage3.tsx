import styled from "styled-components";

const MainPage2 = () => {
  return (
    <WrapperStyled>
      <BannerStyled>
        <BannerLeftSectionStyled>
          <img src="/src/assets/logo2.png" />
        </BannerLeftSectionStyled>
        <BannerRightSectionStyled>
          <img src="/src/assets/profile.jpg" />
        </BannerRightSectionStyled>
      </BannerStyled>
      <BodyStyled>
        <SubBannerStyled>
          <SubBannerLeftSectionStyled>
            <div>PETS SAVE THE WORLD!</div>
          </SubBannerLeftSectionStyled>
          <SubBannerCenterSectionStyled>
            <li>HOME</li>
            <li>NOTICE</li>
            <li>MY PROFILE</li>
          </SubBannerCenterSectionStyled>
          <SubBannerRightSectionStyled>
            <button>SEARCH</button>
            <img src="/src/assets/burger.png" />
          </SubBannerRightSectionStyled>
        </SubBannerStyled>
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
      </BodyStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to bottom left, #bdbdbd, #f4e0c8);
  font-family: "Nunito Sans";
`;

const BannerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  width: 100vw;
`;

const BannerLeftSectionStyled = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-left: -80px;
    margin-top: -40px;
    width: 300px;
  }
`;

const BannerRightSectionStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;
  img {
    width: 70px;
    border-radius: 100%;
  }
`;

const BodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 92vh;
  width: 90vw;
  background-color: aliceblue;
  border: 1px solid #929292;
`;

const SubBannerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10vh;
  width: 90vw;
`;

const SubBannerLeftSectionStyled = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-left: 50px;
    font-weight: bold;
  }
`;

const SubBannerCenterSectionStyled = styled.ul`
  display: flex;
  width: 300px;
  justify-content: space-between;
  list-style-type: none;
  font-weight: 500;
`;

const SubBannerRightSectionStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
  button {
    width: 200px;
    height: 40px;
    border-radius: 100px;
    background-color: #ffffff;
  }
  img {
    margin-left: 20px;
    width: 25px;
  }
`;

const MainAreaStyled = styled.main`
  display: flex;
  width: 90vw;
  height: 100vh;
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
  margin-left: 180px;
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
  margin-left: 200px;
  margin-top: 650px;
  img {
    width: 50px;
    margin-top: 10px;
  }
  div:nth-child(2) {
    margin-top: 5px;
  }
`;

export default MainPage2;
