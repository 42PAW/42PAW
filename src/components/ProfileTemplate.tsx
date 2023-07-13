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
          <img src="/src/assets/profileImage.jpg" />
          <img src="/src/assets/profileImage.jpg" />
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
  background-color: #e6dade;
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
    color: #929292;
    font-size: 90%;
    margin-top: 4%;
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
  background-color: #fdfdfd39;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow-y: scroll;
`;

const PhotoZoneWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  width: 100%;
  /* background-color: red; */
`;

const PhotoZoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95%;
  width: 100%;
  img {
    width: 90%;
    border-radius: 30px;
  }
`;

export default ProfileTemplate;
