import styled from "styled-components";

const ProfileCard = () => {
  return (
    <WrapperStyled>
      <ProfileCardStyled>
        <>
          <ProfileCardImageStyled src="/src/assets/profileImage.jpg" />
          <ProfileCardTitleStyled>오덕애비</ProfileCardTitleStyled>
          <ProfileCardCaptionStyled>
            반갑습니다. 강아지가 세상을 구한다!
          </ProfileCardCaptionStyled>
        </>
        <>
          <ButtonWrapperStyled>
            <FirstButtonsStyled>
              <button>프로필</button>
              <button>팔로우</button>
            </FirstButtonsStyled>
            <SecondButtonsStyled>
              <button>
                <img src="/src/assets/ban.png" />
                차단하기
              </button>
              <button>
                <img src="/src/assets/report.png" />
                신고하기
              </button>
            </SecondButtonsStyled>
          </ButtonWrapperStyled>
        </>
      </ProfileCardStyled>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileCardStyled = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 50%;
  width: 20%;
  border-radius: 50px;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
`;

const ProfileCardImageStyled = styled.img`
  margin-top: 70px;
  width: 50%;
  border-radius: 100%;
`;

const ProfileCardTitleStyled = styled.div`
  margin-top: 20px;
  font-size: 200%;
  color: #4a494ed5;
`;

const ProfileCardCaptionStyled = styled.div`
  margin-top: 10px;
  font-size: 100%;
  color: #929292;
`;

const ButtonWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40%;
  width: 100%;
  margin-top: 50px;
`;

const FirstButtonsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 40%;
  width: 100%;
  button:nth-child(1) {
    background-color: #878abe;
    font-size: 150%;
    color: #ffffff;
    height: 70%;
    width: 35%;
    border: 1px solid #878abe;
    border-radius: 10px;
  }
  button:nth-child(2) {
    background-color: #ffffff;
    font-size: 150%;
    color: #929292;
    height: 70%;
    width: 35%;
    border: 1px solid #929292;
    border-radius: 10px;
  }
`;

const SecondButtonsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
  width: 100%;
  img {
    width: 20%;
    margin-right: 5px;
  }
  button:nth-child(1) {
    display: flex;
    font-size: 100%;
    color: #929292;
    background-color: #ffffff;
    height: 50%;
    width: 20%;
    border: none;
  }
  button:nth-child(2) {
    margin-left: 30px;
    display: flex;
    font-size: 100%;
    color: #929292;
    background-color: #ffffff;
    height: 50%;
    width: 20%;
    border: none;
  }
`;

export default ProfileCard;
