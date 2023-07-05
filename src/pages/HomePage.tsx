import styled from "styled-components";

const HomePage = () => {
  return (
    <Wrapper>
      <LeftNavStyled>
        <LeftNavListStyled>
          <li>
            <img src="/src/assets/claw.png" width="100px" />
          </li>
          <li>HOME</li>
          <li>NOTICE</li>
          <li>TREND</li>
          <li>FOLLOW</li>
          <li>SEARCH</li>
          <li>+</li>
        </LeftNavListStyled>
        <ProfileImageStyled src="/src/assets/profile.jpg" />
        <LogoutButtonStyled>LOGOUT</LogoutButtonStyled>
      </LeftNavStyled>
      <MainAreaStyled></MainAreaStyled>
      <LeftBallStyled />
      <RightBallStyled />
      <DogImageStyled src="/src/assets/oduk.png" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const LeftNavStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  opacity: 0.97;
  height: 100vh;
  width: 200px;
  margin-right: 300px;
  border-radius: 50px;
  z-index: 1;
  align-content: center;
  text-align: center;
`;

const LeftNavListStyled = styled.ul`
  padding: 0;
  li {
    margin-top: 30px;
    list-style-type: none;
    font-size: 30px;
    border-radius: 10px;
    color: #584c50;
  }
`;

const ProfileImageStyled = styled.img`
  width: 90px;
  border-radius: 50px;
  margin-left: 55px;
  margin-top: 15px;
`;

const LogoutButtonStyled = styled.div`
  margin-left: 20px;
  margin-top: 360px;
  padding: 10px 0px;
  font-size: 20px;
  color: #ffffff;
  background-color: #584c50;
  border-radius: 30px;
  width: 150px;
`;

const MainAreaStyled = styled.main`
  background-color: #ffffff;
  opacity: 0.97;
  height: 100vh;
  width: 1000px;
  border-radius: 50px;
  z-index: 1;
`;

const LeftBallStyled = styled.div`
  position: absolute;
  margin-top: 500px;
  height: 800px;
  width: 800px;
  border-radius: 100%;
  background-color: #584c50;
  z-index: 0;
`;

const RightBallStyled = styled.div`
  position: absolute;
  margin-top: -100px;
  margin-left: 1300px;
  height: 800px;
  width: 800px;
  border-radius: 100%;
  background-color: #584c50;
  z-index: 0;
`;

const DogImageStyled = styled.img`
  width: 500px;
  position: absolute;
  margin-top: 600px;
  margin-left: 160px;
  z-index: 0;
`;

export default HomePage;
