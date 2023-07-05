import styled from "styled-components";

const MainPage = () => {
  return (
    <WrapperStyled>
      <BannerStyled>
        <LogoStyled>
          <img src="/src/assets/logo.png" />
          <div>42PET</div>
        </LogoStyled>
        <BannerRightSectionStyled>
          <input placeholder="Search"></input>
          <button>Create</button>
        </BannerRightSectionStyled>
      </BannerStyled>
      <MainAreaStyled>
        <MainLeftStyled>
          <ProfileBoxStyled>
            <img src="/src/assets/profile.jpg" />
            <div>
              <div>멋쟁이 오덕이</div>
              <div>@hyungnoh</div>
            </div>
          </ProfileBoxStyled>
          <MenuBoxStyled>
            <li>Home</li>
            <li>Profile</li>
            <li>Trend</li>
            <li>Follow</li>
            <li>Notice</li>
          </MenuBoxStyled>
        </MainLeftStyled>
        <MainCenterStyled>Bye</MainCenterStyled>
      </MainAreaStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fafcfe;
`;

const BannerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  background-color: #fdfdfd;
  border-bottom: 2px solid #f2f3f7;
`;

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;
  img {
    width: 40px;
    background-color: #f0f4fa;
    padding: 5px 0px;
    border-radius: 10px;
    margin-right: 10px;
  }
  div {
    font-family: "Abril Fatface";
    font-size: 20px;
    color: #394863;
  }
`;

const BannerRightSectionStyled = styled.div`
  display: flex;
  align-items: center;
  margin-right: 60px;
  input {
    height: 40px;
    width: 300px;
    border-radius: 8px;
    border: none;
    background-color: #f0f4fa;
    padding-left: 15px;
    margin-right: 20px;
  }
  button {
    height: 45px;
    width: 90px;
    border: none;
    border-radius: 10px;
    background-color: #394863;
    color: #ffffff;
  }
`;

const MainAreaStyled = styled.div`
  display: flex;
`;

const MainLeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 92vh;
  width: 500px;
`;

const ProfileBoxStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fdfdfd;
  width: 350px;
  height: 120px;
  border-radius: 20px;
  box-shadow: -1px 2px 55px 2px #f1f2f6;
  margin-top: 30px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    margin-left: 50px;
  }
  div {
    margin-left: 10px;
    font-size: 15px;
    font-weight: 200;
    color: #394863;
    & > :nth-child(1) {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

const MenuBoxStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fdfdfd;
  padding: 0px;
  width: 350px;
  height: 400px;
  border-radius: 20px;
  box-shadow: -1px 2px 55px 2px #f1f2f6;
  margin-top: 30px;
  list-style-type: none;
  li {
    width: 300px;
    font-size: 18px;
    font-weight: bold;
    color: #394863;
    border-bottom: 2px solid #f2f3f7;
  }
  & > :last-child {
    border: none;
  }
`;

const MainCenterStyled = styled.main`
  height: 90vh;
  width: 1000px;
  background-color: #fdfdfd;
  box-shadow: -1px 2px 55px 2px #f1f2f6;
  border-radius: 20px;
  margin-top: 30px;
  opacity: 0.5;
`;

export default MainPage;
