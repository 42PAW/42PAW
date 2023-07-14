import styled from "styled-components";

const ProfileTemplate = () => {
  return (
    <>
      <ProfileWrapperStyled>
        <ProfileHeaderStyled>
          <ProfileHeaderLeftSectionStyled>
            <div>오덕애비</div>
            <img src="/src/assets/profileImage.jpg" />
            <div>프로필 수정</div>
          </ProfileHeaderLeftSectionStyled>
          <ProfileHeaderRightSectionStyled>
            <FollowerSectionStyled>
              <div>
                게시물
                <br />
                47
              </div>
              <div>
                팔로워
                <br />
                678
              </div>
              <div>
                팔로잉 <br />
                279
              </div>
            </FollowerSectionStyled>
            <CaptionSectionStyled>
              강아지는 항상 옳다. 오덕아 사랑해!
            </CaptionSectionStyled>
          </ProfileHeaderRightSectionStyled>
        </ProfileHeaderStyled>
        <ProfileBodyStyled>
          <PhotoCategoryToggleStyled>
            <button>
              <img src="/src/assets/feedW.png" />
            </button>
            <button>
              <img src="/src/assets/scrapW.png" />
            </button>
          </PhotoCategoryToggleStyled>
          <PhotoZoneWrapperStyled>
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
            <img src="/src/assets/oduck.png" />
          </PhotoZoneWrapperStyled>
        </ProfileBodyStyled>
      </ProfileWrapperStyled>
    </>
  );
};

const ProfileWrapperStyled = styled.div`
  border-radius: 50px;
  margin-top: 3%;
  margin-bottom: 3%;
  height: 90vh;
  width: 90%;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.25);
`;

const ProfileHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  img {
    width: 30%;
    border-radius: 100%;
  }
`;

const ProfileHeaderLeftSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 100%;
  margin-left: 4%;
  div:nth-child(1) {
    color: #4a494ed5;
    font-size: 120%;
    margin-top: 10%;
  }
  div:nth-child(3) {
    color: #4a494ed5;
    font-size: 80%;
    margin-top: 2%;
  }
  img {
    margin-top: 2%;
    width: 60%;
    border-radius: 100%;
  }
`;

const ProfileHeaderRightSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 100%;
  margin-right: 5%;
`;

const FollowerSectionStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 55%;
  width: 100%;
  div {
    text-align: center;
  }
`;

const CaptionSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  height: 40%;
  width: 100%;
`;

const ProfileBodyStyled = styled.div`
  height: 80%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  img {
    width: 50%;
  }
`;

const PhotoCategoryToggleStyled = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 7%;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #4a494ed5;
    border: none;
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    font-size: 100%;
    width: 50%;
  }
  button:nth-child(1) {
    border-right: 1px solid #ffffff;
  }
  button:hover {
    background-color: #fdfdfd39;
  }
  img {
    width: 7%;
  }
`;

const PhotoZoneWrapperStyled = styled.div`
  height: 93%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow-y: scroll;
  img {
    width: 50%;
  }
`;

export default ProfileTemplate;
