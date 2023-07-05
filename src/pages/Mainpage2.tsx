import styled from "styled-components";

const MainPage2 = () => {
  return (
    <WrapperStyled>
      <BannerStyled>
        <BannerLeftSectionStyled>
          <div>42pet</div>
        </BannerLeftSectionStyled>
        <BannerCenterSectionStyled>
          <li>Home</li>
          <li>Notice</li>
          <li>My Profile</li>
        </BannerCenterSectionStyled>
        <BannerRightSectionStyled>
          <img src="/src/assets/search.png" />
          <img src="/src/assets/burger.png" />
        </BannerRightSectionStyled>
      </BannerStyled>
      <MainAreaStyled>
        <div>
          <SortBarStyled>
            <div>TODAY</div>
            <div>TREND</div>
            <div>FOLLOW</div>
          </SortBarStyled>
          <MainContentStyled></MainContentStyled>
        </div>
      </MainAreaStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f1f1ef;
`;

const BannerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  background-color: #ffffff;
  font-family: "Lausanne";
  border-bottom: 5px solid #e5e9e7;
`;

const BannerLeftSectionStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;
  div {
    font-size: 30px;
    color: #333333;
    text-decoration: underline 3px #f5e474;
  }
`;

const BannerCenterSectionStyled = styled.ul`
  display: flex;
  width: 300px;
  justify-content: space-between;
  list-style-type: none;
  font-size: 20px;
  font-weight: 500;
  color: #929292;
`;

const BannerRightSectionStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 60px;
  margin-left: 200px;
  img {
    width: 25px;
    margin-left: 25px;
  }
`;

const MainAreaStyled = styled.div`
  display: flex;
`;

const SortBarStyled = styled.div`
  display: flex;
  width: 100px;
  align-items: end;
  margin-left: 80px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: "Caprasimo";
  font-weight: 500;
  color: #929292;
  div {
    margin-left: 10px;
  }
  & > :nth-child(1) {
    font-size: 30px;
  }
`;

const MainContentStyled = styled.main`
  height: 85vh;
  width: 1100px;
  background-color: #ffffff;
  box-shadow: -1px 2px 25px 2px #f1f2f6;
  border-radius: 20px;
  margin-left: 80px;
  opacity: 0.9;
`;

export default MainPage2;
