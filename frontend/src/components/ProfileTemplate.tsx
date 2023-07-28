import styled from "styled-components";

const profileInfo = {
  memberName: "아롱이형님",
  nicknameUpdatedAt: "2023-01-23",
  profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  statement: "아롱이의 오빠입니다.\n잘 부탁 합니다.",
  followingCount: 23,
  followerCount: 42,
  boardCount: 47,
};

const imgs = [
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
  "/src/assets/oduck.png",
];

function CountInfo({ boardCount, followerCount, followingCount }) {
  return (
    <CountInfoContainer>
      <ul>
        <li>
          게시물
          <span>{boardCount}</span>
        </li>
        <li>
          팔로워
          <span>{followerCount}</span>
        </li>
        <li>
          팔로잉
          <span>{followingCount}</span>
        </li>
      </ul>
    </CountInfoContainer>
  );
}

const ProfileTemplate = () => {
  return (
    <>
      <ProfileWrapperStyled>
        <ProfileHeaderStyled>
          <ProfileHeaderLeftSectionStyled>
            <img src="/src/assets/profileImage.jpg" />
            <div>프로필 수정</div>
          </ProfileHeaderLeftSectionStyled>
          <ProfileHeaderRightSectionStyled>
            <div className="memberName">{profileInfo.memberName}</div>
            {/* <FollowerSectionStyled> */}
            <CountInfo
              boardCount={profileInfo.boardCount}
              followerCount={profileInfo.followerCount}
              followingCount={profileInfo.followingCount}
            />
            {/* </FollowerSectionStyled> */}
            <CaptionSectionStyled>{profileInfo.statement}</CaptionSectionStyled>
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
            {imgs.map((prop) => (
              <img src={prop} />
            ))}
          </PhotoZoneWrapperStyled>
        </ProfileBodyStyled>
      </ProfileWrapperStyled>
    </>
  );
};

/* 게시물, 팔로워, 팔로잉 수 */
const CountInfoContainer = styled.div`
  display: flex;
  align-items: center;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      flex-direction: column;
      margin-right: 80px;

      &:last-child {
        margin-right: 0;
      }

      span {
        margin-left: 5px;
      }
    }
  }
`;

const ProfileWrapperStyled = styled.div`
  border-radius: 20px;
  margin-bottom: 3%;
  height: 100vh;
  width: calc(100% - 40px);
  margin: 0 auto;
  min-width: 500px; /* 최소 폭 지정 */
  max-width: 935px; /* 최대 폭 지정 */
  box-shadow: var(--default-shadow);
  display: flex; /* Add flex display */
  flex-direction: column; /* Set flex direction to column */
`;

const ProfileHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  justify-content: space-around;
  width: 100%;
  height: 150px;
  img {
    width: 30%;
    border-radius: 100%;
  }

  @media (min-width: 768px) {
    height: 230px;
  }
`;

const ProfileHeaderLeftSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 100%;
  margin-left: 4%;
  div {
    color: #4a494ed5;
    font-size: 1.6rem;
    margin-top: 15px;
  }
  img {
    margin-top: 40px;
    width: 120px;
  }
`;

const ProfileHeaderRightSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 60%;
  height: 100%;
  font-size: 1.6rem;
  margin-right: 5%;
  justify-content: space-around;
  .memberName {
    display: flex;
    justify-content: flex-start;
    margin-top: 40px;
    color: #4a494ed5;
    font-size: 2rem;
  }
`;

const FollowerSectionStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 55%;
  width: 100%;
  div {
    text-align: center;
  }
`;

const CaptionSectionStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 30px;
  height: 40%;
  width: 100%;
`;

const ProfileBodyStyled = styled.div`
  flex: 1;
  overflow: hidden;
  img {
    width: 50%;
  }
  //   height: calc(100% - {ProfileHeaderStyled.height});
  //   border-bottom-left-radius: 50px;
  //   border-bottom-right-radius: 50px;
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
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow-y: scroll;
  img {
    width: calc(33.3% - 6px);
    margin: 3px;
    border-radius: 1%;
  }
`;

export default ProfileTemplate;
